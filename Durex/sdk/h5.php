<?php
require_once(dirname(dirname(dirname(__FILE__)))."/sdk/sdk.php");
class App extends h5{
    function __construct() {
        //parent::__construct("map","wx302ced3eeca6aa59","427fcb7315810011e98ef00698acd908");
        // parent::__construct("dream","wxb110e1de6e249524", "9657b23f77da4dc7210e535abf3d72fa");
        //parent::__construct("dream","wx0dca6e627a97f9dc", "0d15be2eb67c1e4db07bc1a5ebf0a7dd");

        parent::__construct("dream","wxb110e1de6e249524", "9657b23f77da4dc7210e535abf3d72fa");
    }
    public function initUser(){
	    if(empty($_SESSION[$this->appname . 'openid']) || empty($_SESSION[$this->appname . 'accesstoken'])){
            $code=$_GET['code'];
            $REDIRECT_URI=urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
            if(empty($code)){
                header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$this->appId."&redirect_uri=$REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
                exit;
            }else{
                $openinfo = $this->JSSDK->httpGet("https://api.weixin.qq.com/sns/oauth2/access_token?appid=".$this->appId."&secret=".$this->appSecret."&code=$code&grant_type=authorization_code","");
                $arr = json_decode($openinfo,true);

                if(!empty($arr['errcode'])){
                    $times = intval($_GET['times']);
                    $this->retry($times);
                }

                if(empty($arr["openid"]) || strlen($arr["openid"]) != 28){
                    //异常数据
                    $times = intval($_GET['times']);
                    $this->retry($times);
                }

                $this->accesstoken=$arr["access_token"];
                $this->openid=$arr["openid"];
                $_SESSION[$this->appname . 'openid']=$this->openid;
                $_SESSION[$this->appname . 'accesstoken']=$this->accesstoken;
            }
        }else{
            $this->openid = $_SESSION[$this->appname . 'openid'];
            $this->accesstoken = $_SESSION[$this->appname . 'accesstoken'];
        }
        if($this->openid&&$this->accesstoken){
            $userinfo = $this->JSSDK->httpGet("https://api.weixin.qq.com/sns/userinfo?access_token=".$this->accesstoken."&openid=".$this->openid."&lang=zh_CN","");
            $arr = json_decode($userinfo,true);
            if(empty($arr) || !empty($arr['errcode'])){

                $REDIRECT_URI=urlencode('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING']);
                unset($_SESSION[$this->appname . 'accesstoken']);
                unset($_SESSION[$this->appname . 'openid']);
                header("Location:https://open.weixin.qq.com/connect/oauth2/authorize?appid=".$this->appId."&redirect_uri=$REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect");
                exit;
            }
            if(empty($arr["openid"]) || strlen($arr["openid"]) != 28){
                //异常数据
                $times = intval($_GET['times']);
                $this->retry($times);
            }

            $this->userinfo = $arr;
            $uInfo = $this->GetUser($this->openid);

            if(empty($uInfo)){
                $_nick_name = str_replace("'","",$arr["nickname"]);
                $_nick_name = $this->mysql->escape($_nick_name);
                $insertArr = array(
                    'openid'=>$arr["openid"],
                    'nickname'=>$_nick_name,
                    'sex'=>$arr["sex"],//1男2女0未知
                    'headimgurl'=>$arr["headimgurl"],
                    'key'=>md5(uniqid(mt_rand(), true)),
                    'type'=>1
                );
                $result = $this->insertSql('user_'.$this->appname,$insertArr);

                $this->userinfo["uid"] = $result;
                $this->userinfo["nickname"] = $arr["nickname"];
                $this->userinfo["status"] = 1;
                $this->userinfo["headimgurl"] = $arr["headimgurl"];
                $this->userinfo["score"] = 0;
                $this->userinfo["bird_1"] = 0;
                $this->userinfo["bird_2"] = 0;
                $this->userinfo["bird_3"] = 0;
                $this->userinfo["bird_4"] = 0;
                $this->userinfo["role"] = 0;
                $this->userinfo["type"] = 1;
            }else{

                $this->userinfo["uid"] = $uInfo[0]["id"];
                $this->userinfo["nickname"] = $uInfo[0]["nickname"];
                $this->userinfo["status"] = $uInfo[0]["status"];
                $this->userinfo["headimgurl"] = $uInfo[0]["headimgurl"];
                $this->userinfo["score"] = $uInfo[0]["score"];
                $this->userinfo["bird_1"] = $uInfo[0]["bird_1"];
                $this->userinfo["bird_2"] = $uInfo[0]["bird_2"];
                $this->userinfo["bird_3"] = $uInfo[0]["bird_3"];
                $this->userinfo["bird_4"] = $uInfo[0]["bird_4"];
                $this->userinfo["role"] = $uInfo[0]["role"];
                $this->userinfo["type"] = $uInfo[0]["type"];
            }
            $this->setSession('uid',$this->userinfo["uid"]);
        }
        return $this->openid;
    }
    public function errorPage($info){
        /*
            跳转到系统报错页面
        */
        header("Location:http://test.tttang.net/go/error");
        exit;
    }
    public function retry($times){
        if($times > 2){
            $this-->errorPage();
        }
        header("Location:http://test.tttang.net/go?times=".($times + 1));
        exit;
    }
    public function updateLocation($openid,$lat,$long){
        $result = $this->updateSql('user_map',
            array(
                'lat'=>$lat,
                'long'=>$long,
                'timestamp'=>time()
            ),array(
                'openid'=>$openid
            )
        );
    }
    public function getMyLocation(){
        $openid = $this->getSession("openid");
        $data = $this->selectSql(
            "user_map",
            array("lat","long"),
            array("openid"=>$openid)
        );
        if(is_array($data) && count($data) > 0){
            $lat = doubleval($data[0]["lat"]);
            $long = doubleval($data[0]["long"]);
            return array(
                "lat"=>$lat,
                "long"=>$long
            );
        }
        return false;
    }
    public function getRewardCount($type,$baseTime){
        //$openid = $h5->getSession("openid");
        $dt = time() - $baseTime;          //相对时间
        $sql = "SELECT count(1) as _count from `reward_map` where `time` < ".$dt ." AND `status` = 0 AND `type` = $type OR ";
        $sql .= "status = 1 AND `type` = $type AND `timestamp` < " . ($dt - 600);
        $data = $this->mysql->getData($sql);

        if(is_array($data) && count($data) > 0){
            return intval($data[0]["_count"]);
        }
        return 0;
    }
    public function addBoxBird($point,$distance,$count,$fid=0){
        $max_distance = 0.02;
        $min_distance = 0.001;
        if($distance < $min_distance){
            $distance = $min_distance;
        }
        if($distance > $max_distance){
            $distance = $max_distance;
        }

        $boxes = $this->getBoxes($point,$distance);
        /*
            生成$count只鸟,并根据每只鸟的lat和long,将他们放到memcache中
        */
        $table = "bird";
        if($fid > 0){
            $table = "bird".$fid;
        }
        $lat = $point["lat"];
        $long = $point["long"];
        $points = array();
        for($i = 0 ; $i < $count ; $i ++){
            $rand_lat = rand(1,20000) - 10000;
            $rand_long = rand(1,20000) - 10000;

            $d_lat = $rand_lat / 10000.0 * $distance / 2 + $lat;
            $d_long = $rand_long / 10000.0 * $distance / 2 + $long;

            $d_name = $this->name_encode($d_lat,$d_long);
            $should_add = true;
            for($k = 0 ; $k < count($boxes) ; $k ++){
                if($boxes[$k] == $d_name){
                    $should_add = false;
                }
            }
            if($should_add){
                $boxes []= $d_name;
            }


            $points []= array(
                "lat"=>$d_lat,
                "long"=>$d_long
            );
        }

        $box_group = array();
        for($i = 0 ; $i < count($boxes) ; $i ++){
            $box_group[$boxes[$i]] = false;
        }

        $sql_text = "";
        for($i = 0 ; $i < count($points) ; $i ++){
            $point = $points[$i];
            //10000 5000 500 30
            $type = 1;

            $rand = rand(1,10000);
            if($rand < 4000){
                $type = 1;
            }else if($rand < 8000){
                $type = 2;
            }else if($rand < 9800){
                $type = 3;
            }else{
                $type = 4;
            }

            $lat = $point["lat"];
            $long = $point["long"];
            $key = md5(uniqid(mt_rand(), true));
            $points[$i]["key"] = $key;
            $points[$i]["type"] = $type;
            $points[$i]["fid"] = $fid;

            $name = $this->name_encode($lat,$long);     //当前点属于的box
            if($box_group[$name] == false){
                $box_group[$name] = array();
            }
            $box_group[$name] []= $points[$i];
            $status = 1;

            $sub_text = "(NULL,'$lat','$long', '1','$type', '$status', '$key', NULL),";
            $sql_text .= $sub_text;
        }
        for($i = 0 ; $i < count($boxes) ; $i ++){
            $box = $boxes[$i];      //mencache key
            if($box_group[$box] != false){
                $cache = $this->getMMC($box);
                if(is_array($cache) && count($cache) > 0 && count($cache) < 500){
                    //有cache
                    $cache = array_merge($cache,$box_group[$box]);
                    $this->setMMC($box,$cache);
                }else{
                    if(count($cache) >= 500){
                        //nothing to do
                    }else{
                        $this->setMMC($box,$box_group[$box]);
                    }
                }
            }
        }
        $sql = "INSERT INTO `$table` VALUES ".$sql_text;
        $sql = substr($sql,0,strlen($sql)-1);
        $res = $this->mysql->runSql($sql);

        if($res){
            return $points;
        }
        return array();
    }
    public function getBoxBird($point,$distance){
        $max_distance = 0.02;
        $min_distance = 0.001;
        if($distance < $min_distance){
            $distance = $min_distance;
        }
        if($distance > $max_distance){
            $distance = $max_distance;
        }
        $boxes = $this->getBoxes($point,$distance);

        $birds = array();
        for($i = 0 ; $i < count($boxes) ; $i ++){
            $box = $boxes[$i];      //mencache

            $cache = $this->getMMC($box);
            if(is_array($cache) && count($cache) > 0){
                $birds = array_merge($birds,$cache);
            }
        }
        return $birds;
    }
    public function updateCacheBird($point,$key){
        $lat = $point["lat"];
        $long = $point["long"];
        $box = $this->name_encode($lat,$long);

        $cache = $this->getMMC($box);
        $new_cache = array();
        if(is_array($cache) && count($cache) > 0){
            for($i = 0 ; $i < count($cache) ; $i ++){
                $bird = $cache[$i];
                if($bird["key"] != $key){
                    $new_cache []= $bird;
                }
            }
            $this->setMMC($box,$new_cache);
        }

    }
    public function getRectBird($birds,$point,$distance){

        $max_distance = 0.02;
        $min_distance = 0.001;
        if($distance < $min_distance){
            $distance = $min_distance;
        }
        if($distance > $max_distance){
            $distance = $max_distance;
        }

        $x1 = doubleval($point["lat"]) - $distance;
        $x2 = doubleval($point["lat"]) + $distance;
        $y1 = doubleval($point["long"]) - $distance;
        $y2 = doubleval($point["long"]) + $distance;
        $data = array();
        for($i = 0 ; $i < count($birds) ; $i ++){
            $lat = doubleval($birds[$i]["lat"]);
            $long = doubleval($birds[$i]["long"]);
            if($lat > $x1 && $lat < $x2 && $long > $y1 && $long < $y2){
                $data[]= $birds[$i];
            }
        }
        return $data;
    }
    public function getRectPlayer($players,$point,$distance){
        $max_distance = 0.02;
        $min_distance = 0.001;
        if($distance < $min_distance){
            $distance = $min_distance;
        }
        if($distance > $max_distance){
            $distance = $max_distance;
        }

        $x1 = doubleval($point["lat"]) - $distance;
        $x2 = doubleval($point["lat"]) + $distance;
        $y1 = doubleval($point["long"]) - $distance;
        $y2 = doubleval($point["long"]) + $distance;
        $data = array();
        for($i = 0 ; $i < count($birds) ; $i ++){
            $lat = doubleval($players[$i]["lat"]);
            $long = doubleval($players[$i]["long"]);
            if($lat > $x1 && $lat < $x2 && $long > $y1 && $long < $y2){
                $data[]= $players[$i];
            }
        }
        return $data;
    }
    public function getDistance($point1,$point2){
        $x1 = $point1["lat"];
        $x2 = $point2["lat"];
        $y1 = $point1["long"];
        $y2 = $point2["long"];
        $distance = pow((pow(($x2 - $x1),2) + pow(($y2 - $y1),2)),0.5);
        return $distance;
    }
    public function getOnline(){
        $dt = time() - 120;
        $sql = "SELECT `lat`,`long`,`role` FROM `user_map` WHERE `timestamp` > ".$dt." limit 50000";
        $data = $this->mysql->getData($sql);
        if(is_array($data) && count($data > 0)){
            return $data;
        }
        return array();
    }
    public function getCacheOnline($second){
        $timestamp = $this->getMMC("online_update_time");
        if($timestamp == false){
            $timestamp = time();
            $this->setMMC("online_update_time",$timestamp);
        }
        $dt = time() - $timestamp;
        if($dt > $second){
            $data = $this->getOnline();
            $this->setMMC("online",$data);
            return $data;
        }else{
            $data = $this->getMMC("online");
            if($data != false && is_array($data)){
                return $data;
            }else{
                return array();
            }
        }
        return array();
    }
    public function updateOnlineCache($second){
        $timestamp = $this->getMMC("online_update_time");
        if($timestamp == false){
            $timestamp = time();
            $this->setMMC("online_update_time",$timestamp);
        }
        $dt = time() - $timestamp;
        if($dt > $second){
            $data = $this->getOnline();
            $this->setMMC("online",$data);
            $this->setMMC("online_update_time",$timestamp);
        }else{
            $data = $this->getMMC("online");
        }
    }
    public function getOnlineCount(){
        $dt = time() - 60;
        $sql = "SELECT count(1) as _count FROM `user_map` WHERE `timestamp` > ".$dt;
        $data = $this->mysql->getData($sql);
        if(is_array($data) && count($data) > 0){
            return intval($data[0]["_count"]);
        }
        return false;
    }
    public function name_encode($lat,$long){
        $x = floor($lat * 100);
        $y = floor($long * 100);
        $name = "m_".$x."_".$y;
        return $name;
    }
    public function name_decode($name){
        $arr = explode("_",$name);
        $lat = doubleval($arr[1]);
        $long = doubleval($arr[2]);
        return array(
            "lat"=>$lat,
            "long"=>$long
        );
    }
    public function getBoxes($point,$distance){
        $max_distance = 0.02;
        $min_distance = 0.001;
        if($distance < $min_distance){
            $distance = $min_distance;
        }
        if($distance > $max_distance){
            $distance = $max_distance;
        }


        $lat = $point["lat"];
        $long = $point["long"];

        $x1 = floor(($lat - $distance) * 100);
        $y1 = floor(($long - $distance) * 100);
        $x2 = floor(($lat + $distance) * 100);
        $y2 = floor(($long + $distance) * 100);

        $boxes = array();
        for($x = $x1 ; $x <= $x2 ; $x ++){
            for($y = $y1 ; $y <= $y2 ; $y ++){
                $name = "m_".$x."_".$y;
                $boxes[]= $name;
            }
        }
        return $boxes;
    }
    public function getMyRole(){
        $openid = $this->getSession("openid");
        $data = $this->selectSql(
            "user_map",
            array("role"),
            array("openid"=>$openid)
        );
        if(is_array($data) && count($data) > 0){
            $role = intval($data[0]["lat"]);
            return $role;
        }
        return 0;
    }
    public function setMyRole($role){
        $openid = $this->getSession("openid");
        $result = $this->updateSql('user_map',
            array(
                'role'=>$role
            ),array(
                'openid'=>$openid
            )
        );
    }
    public function log($openid,$type,$status){
        $insertArr = array(
            'openid'=>$openid,
            'type'=>$type,
            'status'=>$status
        );
        $this->insertSql('log_map',$insertArr);
    }
    public function getNickName($kv_index){
        $kv_data = $this->GetData($kv_index);
        return $kv_data["nickname"];
    }
    public function GetRestScore($openid,$type){
        $openid = $this->mysql->escape($openid);
        $sql = "SELECT `bird_".$type."` FROM `user_map` WHERE `openid`='$openid'";
        $data = $this->mysql->getData($sql);
        if(count($data) > 0){
            $current_score = $data[0]["bird_".$type];
            return $current_score;
        }
        return -1;
    }
    public function SubScoreByOpenId($openid,$type,$score){
        $openid = $this->mysql->escape($openid);
        $sql = "UPDATE  `user_map` SET `bird_".$type."` = `bird_".$type."`- $score  WHERE  `openid` = '$openid';";
        return $this->mysql->runSql($sql);
    }
    public function AddScoreByOpenId($openid,$type,$score){
        $openid = $this->mysql->escape($openid);
        $sql = "UPDATE  `user_map` SET  `bird_".$type."` = `bird_".$type."`+ $score,`score`=`score` + $score  WHERE  `openid` = '$openid'";
        return $this->mysql->runSql($sql);
    }
}
?>