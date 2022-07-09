//getting all required input
let inputBox = document.querySelector(".txt");
let todoList = document.querySelector(".tododlist");
let press = -1;
let ind = -1;
display();

inputBox.addEventListener("keydown" , function(event){
    if(event.key === "Enter")
    {
        //getting user entered value
        let userData = inputBox.value;

        //getting data from local storage
        let storageData = getLocalStorage(); 
        
        if(userData.trim() !=0)
        {
            let objectt = {
                data: userData,
                complete: false
            } ;
            if(press != -1)
            {
                press = -1;
                storageData[ind] = objectt;
                ind = -1;
            }
            else{
                storageData.push(objectt);
            }

            //storing after data push and then convert to json object to string
            localStorage.setItem("New Todo" , JSON.stringify(storageData));
        }
        else{
            alert("Input is not valid");
        }
        display();
    }
});

function getLocalStorage()
{
    let storageData = localStorage.getItem("New Todo");
    if(!storageData)
        return [];
    else{
        //transform json string to array(json object)
        storageData = JSON.parse(storageData);
        return storageData;
    }
}

function display()
{
    let storageData = getLocalStorage();
    let newListTag = '';
    storageData.forEach(function(element , index){
        if(element.complete){
            console.log(index);
           newListTag += `<div class = "line"><s><li class = "listtxt"> ${element.data} </li></s><span class = 'btns'><input class = "del" type = "button" value="x" onclick = "deleteTask(${index})"> <input type = "button" class = "edit" value="Edit" onclick = "editTask(${index})"><input class = "check"  checked type = "checkbox" onclick = "check(${index})"> </span></div>`;
        }
           else
           newListTag += `<div class = "line"><li class = "listtxt"> ${element.data} </li> <span class = 'btns'><input class = "del" type = "button" value="x" onclick = "deleteTask(${index})"> <input type = "button" class = "edit" value="Edit" onclick = "editTask(${index})" ><input class = "check" type = "checkbox" onclick = "check(${index})" > </span></div>`;
           newListTag += `<hr>`;
    }); 

    //adding new li tag inside ul tag
    todoList.innerHTML = newListTag;
    //once task added leave input field
    inputBox.value = "";
} 

function check(index)
{
   let storageData = getLocalStorage();
   if(storageData[index].complete)
   {
        storageData[index].complete = false;
   }
   else{
    storageData[index].complete = true;
   }
   localStorage.setItem("New Todo" , JSON.stringify(storageData));
   display();
}

function deleteTask(index)
{
    let storageData = getLocalStorage();
    //delete the particular index element
    storageData.splice(index , 1);
    //after delete set the local Storage
    localStorage.setItem("New Todo" , JSON.stringify(storageData));
    display();
}

function editTask(index)
{
    let storageData = getLocalStorage();
    inputBox.value = storageData[index].data;
    inputBox.focus();
    press = 1;
    ind = index;
}