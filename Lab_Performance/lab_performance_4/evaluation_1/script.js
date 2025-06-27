let student=[
    {
        'Name':'Bappy',
        Roll:'221-15-5656',
        subjectScore:{
            Bangla:75,
            English:70,
            CSE115:80,
            Mat101:85
        },
        attaindence:true
    },
    {
        'Name':'akash',
        Roll:'221-15-5688',
        subjectScore:{
            Bangla:70,
            English:80,
            CSE115:80,
            Mat101:75
        },
        attaindence:true
    },
    {
        'Name':'Shovon',
        Roll:'221-15-5560',
        subjectScore:{
            Bangla:80,
            English:80,
            CSE115:85,
            Mat101:75
        },
        attaindence:true
    }
];
let totalScore=0;
for(let i =0; i<student.length;i++){
    if(student[i].attaindence){

        let totalScore = student[i].subjectScore.Bangla+student[i].subjectScore.English+student[i].subjectScore.CSE115+student[i].subjectScore.Mat101;
        console.log(`Total Score : ${totalScore}`);
        
    }else{
        console.log('Not Eligible');
    }
}