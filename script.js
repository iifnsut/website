var form1= document.getElementById("form1");
var form2= document.getElementById("form2");
var form3= document.getElementById("form3");

var next1= document.getElementById("next1");
var next2= document.getElementById("next2");
var next3= document.getElementById("next3");
var back1= document.getElementById("back1");
var back2= document.getElementById("back2");
var back3= document.getElementById("back3");

var progress= document.getElementById("progress");


next1.onclick= function(){
    form1.style.left= "-40rem";
    form2.style.left= "0rem";
    progress.style.width="7.6vw";
}

back1.onclick= function(){
    form1.style.left= "0rem";
    form2.style.left= "30rem";
    progress.style.width="0vw";
}

next2.onclick= function(){
    form2.style.left= "-40rem";
    form3.style.left= "0rem";
    progress.style.width="15.2vw";
}

back2.onclick= function(){
    form2.style.left= "0rem";
    form3.style.left= "30rem";
    progress.style.width="7.6vw";
}

next3.onclick= function(){
    form3.style.left= "-40rem";
    form4.style.left= "0rem";
    progress.style.width="22.8vw";
}

back3.onclick= function(){
    form3.style.left= "0rem";
    form4.style.left= "30rem";
    progress.style.width="15.2vw";
}

next4.onclick= function(){
    form4.style.left= "-40rem";
    form5.style.left= "0rem";
    progress.style.width="30.4vw";
}

back4.onclick= function(){
    form4.style.left= "0rem";
    form5.style.left= "30rem";
    progress.style.width="22.8vw";
}

// add member
const addMemberIcon = document.getElementById('add-member-icon');
        const teamMembersContainer = document.getElementById('team-members');

        addMemberIcon.addEventListener('click', function() {
            const newTeamMember = document.createElement('div');
            newTeamMember.innerHTML = `
                <input type="text" name="member_name" placeholder="Team member name">
                <input type="number" name="member_number" placeholder="Team member mobile number">
                <input type="email" name="member_email" placeholder="Team member email id">
            `;
            teamMembersContainer.appendChild(newTeamMember);
        });

