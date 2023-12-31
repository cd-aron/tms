
const uname = document.querySelector('#uname');
const body = document.querySelector('.body');

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const name = params.get('uname');
uname.textContent = name;

//Dashboard
// let dashboard = document.querySelector("#dashboard")
//    dashboard.addEventListener("click" ,(e) =>{
//      e.preventDefault();

//     fetch("http://localhost/tms/admin/dashboard.html")
//     .then(response => response.text())
//     .then(htmlContent => {
//       body.innerHTML = htmlContent;
//     })
//     .catch((error) => console.error("Error fetching dashboard.html:", error));
// });


//Task 
let task = document.querySelector("#task")
   task.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/task.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

      //task display
         fetch("http://localhost/tms/server/tasks.php")
         .then(response => response.json())
         .then(data =>{
           console.log(data)
           var temp = ""
           var isCompleted = "Completed"
           var isPending = "Pending"
            data.forEach(item => {

           
             if(item.status == 1){
              temp += `
              <tr>
                  <td>${item.sl_no}</td>
                  <td>${item.uname}</td>
                  <td>${item.deadline}</td>
                  <td>${item.task}</td>
                  <td>${item.task_description}</td>
                  <td></td>
                  <td style="background-color:green; color:white;">${isCompleted}</td>
              </tr>
          `;
             }
             else{
              temp += `
                  <tr>
                  <td>${item.sl_no}</td>
                  <td>${item.uname}</td>
                  <td>${item.deadline}</td>
                  <td>${item.task}</td>
                  <td>${item.task_description}</td>
                  <td><button class="editBtn" onclick="editRedirect(event, ${item.sl_no})">Edit</button></td>
                  <td style="background-color:red; color:white;">${isPending}</td>
              </tr>
                            `;
             }
            })
           document.getElementById('taskTable').innerHTML = temp;
         })
         .catch(error => {
          console.error(error)
         })
      //task display

    })
    .catch((error) => console.error("Error fetching task.html:", error));
});
    function editRedirect(event, id){
        event.preventDefault()
        window.open(`http://localhost/tms/admin/edit_task.html?id=${id}`, '_blank');
      }
    
    
 //Task 
//Assign task
let assign_task = document.querySelector("#assign_task")
assign_task.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/assign_task.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

    //intern_option
    let intern_opt = document.querySelector("#intern_opt");
    fetch("http://localhost/tms/server/intern_opt.php")
        .then(response => response.json())
        .then(data => {

              console.log(data)

               data.forEach(username => {
               
                let option = document.createElement("option");
                option.value = username.id; 
                option.text = username.uname;
                option.classList.add("usr_name");
                intern_opt.add(option);           

            });
        })
        .catch(error => {
            console.error(error);
        });
    //intern_option

    // Assign Task
let usr_name = document.querySelectorAll('.usr_name');

let deadline = document.querySelector('#deadline')
let task = document.querySelector('#task_d')
let task_des = document.querySelector('#task_des')
let link = document.querySelector('#link')
let doc = document.querySelector('#doc')

let assign_form = document.querySelector('#assign_form')


assign_form.addEventListener("submit", e =>{
    e.preventDefault() 
  
    let selected_usr_name = intern_opt.options[intern_opt.selectedIndex].text;
    let data = {
      "u_id": intern_opt.value,
      "uname":selected_usr_name,
      "deadline": deadline.value,
      "task": task.value,
      "task_des": task_des.value,
      "link": link.value,
      "doc": doc.value
    }

    const init = {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Request-Type" :"application/json"
      },
      body: JSON.stringify(data)
    }

    fetch("http://localhost/tms/server/assign_task.php",init)
    .then(response => response.json())
    .then(message =>{
       alert(message.message)
       window.location.reload("http://localhost/tms/admin/dashboard.html");
          
        
    })
    .catch(error =>{
      console.error(error)
    })

    //Assign Task
})
    })
    .catch((error) => console.error("Error fetching assing_task.html:", error));
});

//Interns
let interns = document.querySelector("#interns")
interns.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/interns.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching inters.html:", error));
});

// Add sup
let add_sup = document.querySelector("#add_sup")
add_sup.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/add_sup.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;

      let add_form = document.querySelector('#add_form');


      let email = document.querySelector('#email');
      let phone_number = document.querySelector('#phone_number');
      let role = document.querySelector('#role');
      let uname = document.querySelector('#uname');
      
      let pass = document.querySelector('#pass');
      let cpass = document.querySelector('#cpass');
      
      function check(field) {
         if (field.value === "") {
            field.style.borderColor = "red";
            const para = document.createElement("p");
            para.innerText = "Please Fill " + field.name;
            document.body.appendChild(para);
            setTimeout(function() {
              document.body.removeChild(para);
            }, 2000);
            
            return false; // Return false to indicate that the field is empty
         } else {
            field.style.borderColor = "";
      
            if (pass.value !== cpass.value) {
              const cp_message = document.getElementById('cp_message');
              cp_message.innerText = "Password doesn't match";
              cp_message.style.color = "red";
              return false; // Return false to indicate that passwords don't match
           }
           return true; // Return true when the field is filled and passwords match
         }
      }
      
      add_form.addEventListener("submit", (e) =>{
            e.preventDefault();
            
            if (
              check(email) &&
              check(phone_number) &&
              check(role) &&
              check(uname) &&
              check(pass) &&
              check(cpass)
            ) {   
              
              const data = {
                  "email": email.value,
                  "phone_number": phone_number.value,
                  "role": role.value,
                  "uname": uname.value,
                  "pass": pass.value 
              }
      
              const init = {
                  method: "POST",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              }
      
              fetch("http://localhost/tms/server/add_sup.php", init)
              .then(response => {
                if (response.status === 200) {
                  return response.json()
              } else if (response.status === 405) {
                  throw new Error("Bad Request")
              } else if (response.status === 409) {
                  throw new Error("Data already exists")
              } else {
                  return response.json().then(errorData => {
                      throw new Error("Internal Server Error")
                  });
              }
              })
              .then(data =>{
                 alert(data.message)
                 window.location.href = "http://localhost/tms/admin/dashboard.html"
              })
              .catch(error =>{
                if (error.message === "Bad Request") {
                  alert(error.message)
              } else if (error.message === "Admin already exists") {
                  alert(error.message)
              } else {
                  alert("Internal Server Error")
              }
              })
            }
      })
      
         

    })
    .catch((error) => console.error("Error fetching add_sup.html:", error));
});

// Profile
let profile = document.querySelector("#profile")
profile.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/admin_profile.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
         
        let user_name = document.querySelector('#user_name')
        let email = document.querySelector('#email');
        let phone_number = document.querySelector('#phone_number');
        let role = document.querySelector('#role');
        let uname2 = document.querySelector('#uname2');

        fetch("http://localhost/tms/server/admin_profile.php")
        .then(response => response.json())
        .then(data =>{
            console.log(data)
            user_name.textContent = data.uname
            email.value = data.email
            phone_number.value = data.phone_number
            role.value = data.role
            uname2.value = data.uname
        })
        .catch(error =>{

        })

    })
    .catch((error) => console.error("Error fetching profile.html:", error));
});

//Notification
let notification = document.querySelector("#notification")
notification.addEventListener("click" ,(e) =>{
     e.preventDefault();

    fetch("http://localhost/tms/admin/notification.html")
    .then(response => response.text())
    .then(htmlContent => {
      body.innerHTML = htmlContent;
    })
    .catch((error) => console.error("Error fetching notification.html:", error));
});


