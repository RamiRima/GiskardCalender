<?php
class Availabilities{
    private $conn;
    private $table= "availabilities";

    public $id;
    public $start;
    public $end;
    public $date;

    //Constructor
    public function __construct($db){
        $this->conn=$db;
    }
 
    public function read(){
        $query= 'SELECT *  FROM '.$this->table.' ORDER BY date,start;';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }
    public function readDay(){
        $query= 'SELECT *  FROM '.$this->table.' WHERE date= ? ORDER BY date,start ;';
        $stmt=$this->conn->prepare($query);
        $stmt->bindParam(1,$this->date);
        $stmt->execute();
        return $stmt;
    }

    public function create(){
        $query='INSERT INTO '.$this->table. '
        SET 
            start = :start,
            end = :end,
            date = :date
        ';
        $stmt=$this->conn->prepare($query);
        $this->start= htmlspecialchars(strip_tags($this->start));
        $this->end= htmlspecialchars(strip_tags($this->end));
        $this->date= htmlspecialchars(strip_tags($this->date));
        $stmt->bindParam(':start',$this->start);
        $stmt->bindParam(':end',$this->end);
        $stmt->bindParam(':date',$this->date);
       if($stmt->execute()){
        return 1;
       }else{
        return 0;
       }
       
    }

    public function delete(){
        $query='DELETE FROM '.$this->table.' WHERE id = :id';
        $stmt=$this->conn->prepare($query);
        $this->id= htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(':id',$this->id);

        if($stmt->execute()){
            return 1;
           }else{

            return 0;
           }
        
    }

    public function conflict(){
        $query='SELECT * FROM '.$this->table.' WHERE date = :date AND ((:end>start AND :end<end) OR (:start>start AND :start<end) OR (:start<=start AND :end>=end)); ';
        $stmt=$this->conn->prepare($query);
        $this->date=htmlspecialchars(strip_tags($this->date));
        $this->start=htmlspecialchars(strip_tags($this->start));
        $this->end=htmlspecialchars(strip_tags($this->end));
        $stmt->bindParam(':date',$this->date);
        $stmt->bindParam(':start',$this->start);
        $stmt->bindParam(':end',$this->end);
        $stmt->execute();
        $num=  $stmt->rowCount();
        return $num;    
    }
}



?>