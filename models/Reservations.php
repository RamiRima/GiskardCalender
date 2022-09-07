<?php
class Reservations{
    private $conn;
    private $table="reservations";

    public $id;
    public $start;
    public $end;
    public $date;
    public $title;
    public $email;

    public function __construct($db){
       $this->conn=$db; 
    }
    
    public function read(){
        $query= 'SELECT * FROM '.$this->table.' ORDER BY date,start;';
        $stmt=$this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }   
    
    public function readDay(){
        $query= 'SELECT *  FROM '.$this->table.' WHERE date= ? ORDER BY date,start;';
        $stmt=$this->conn->prepare($query);
        $stmt->bindParam(1,$this->date);
        $stmt->execute();
        return $stmt;
    }

    public function delete(){
     $query= 'SELECT * FROM '.$this->table.' WHERE email =? and start = ? and date=? ;'; 
     $stmt=$this->conn->prepare($query);
     $this->email= htmlspecialchars(strip_tags($this->email));
     $this->start= htmlspecialchars(strip_tags($this->start));
     $this->date= htmlspecialchars(strip_tags($this->date));
     $stmt->bindParam(1,$this->email);
     $stmt->bindParam(2,$this->start);
     $stmt->bindParam(3,$this->date);
     $stmt->execute();
     $num=$stmt->rowCount();
     if($num!=0){
        $query2='DELETE FROM '.$this->table.' WHERE email =? and start = ? and date=? ;';
        $stmt2=$this->conn->prepare($query2);
        $stmt2->bindParam(1,$this->email);
        $stmt2->bindParam(2,$this->start);
        $stmt2->bindParam(3,$this->date);
        if($stmt2->execute()){
            return 1;
        }else{
            return 0;
        }
     }else{ 
        return -1;
     }
    }
    public function deleteIndex(){
        $query= 'DELETE FROM '.$this->table.' WHERE id =?  ;'; 
        $stmt=$this->conn->prepare($query);
        $this->id= htmlspecialchars(strip_tags($this->id));
        $stmt->bindParam(1,$this->id);
        if($stmt->execute()){
            return 1;
        }else{return 0;}

    }

    public function create(){
        $query='INSERT INTO '.$this->table. '
        SET 
            start = :start,
            end = :end,
            date = :date,
            title = :title,
            email = :email
        ';
        $stmt=$this->conn->prepare($query);
        $this->start= htmlspecialchars(strip_tags($this->start));
        $this->end= htmlspecialchars(strip_tags($this->end));
        $this->date= htmlspecialchars(strip_tags($this->date));
        $this->title= htmlspecialchars(strip_tags($this->title));
        $this->email= htmlspecialchars(strip_tags($this->email));

        $stmt->bindParam(':start',$this->start);
        $stmt->bindParam(':end',$this->end);
        $stmt->bindParam(':date',$this->date);
        $stmt->bindParam(':title',$this->title);
        $stmt->bindParam(':email',$this->email);
       if($stmt->execute()){
        return true;
       }else{
        echo "Erro";
        return false;
       }
    }
    public function testYours(){
        $query='SELECT * FROM '.$this->table.' WHERE :date=date and :start=start and email=:email';
        $stmt=$this->conn->prepare($query);
        $this->start= htmlspecialchars(strip_tags($this->start));
        $this->date= htmlspecialchars(strip_tags($this->date));
        $this->email= htmlspecialchars(strip_tags($this->email));
        
        $stmt->bindParam(':start',$this->start);
        $stmt->bindParam(':date',$this->date);
        $stmt->bindParam(':email',$this->email);
        $stmt->execute();
        $num=  $stmt->rowCount();
        return $num;   

    }
}



?>