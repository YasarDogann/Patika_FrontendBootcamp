document.addEventListener("DOMContentLoaded", function(){
    // DOM elementlerini seçtik
    const taskInput = document.getElementById("task");
    const list = document.getElementById("list");
    const toastSuccess = new bootstrap.Toast(document.getElementById("successToast"));
    const toastError = new bootstrap.Toast(document.getElementById("errorToast"));

    // local storageye görevleri yüklüyor
    loadTasks();

    // yeni görev ekleme fonksyionu
    window.newElement = function(){
        let tastText = taskInput.value.trim(); // boşlukarı temizle

        if(tastText === ""){
            showToast("error"); // boş giriş hatasında çalışıcak
            return;
        }

        addTaskToDOM(tastText);
        saveTask(tastText);
        showToast("success");
        taskInput.value = "";
    };

    //yeni görev DOM'a eklenicek
    function addTaskToDOM(tastText, completed=false){
        let li = document.createElement("li");
        li.textContent = tastText;

        // eğer görev tamamlanmışsa checked sınıfı eklenicek
        if(completed){
            li.classList.add("checked");
        }

        // silme butonu ekle
        let closeBtn = document.createElement("span");
        closeBtn.textContent = "x";
        closeBtn.classList.add("close");
        closeBtn.onclick = function(){
            removeTaskFromDOM(li);
            removeTaskFromStorage(tastText);
        };

        let editBtn = document.createElement("span");
        editBtn.textContent = "✏️";
        editBtn.classList.add("edit");
        editBtn.onclick = function(){
            updateTask(tastText,li);
        };

        li.onclick = function(){
            li.classList.toggle("checked");
            updateTaskStatus(tastText, li.classList.contains("checked"));
        };

        li.appendChild(editBtn);
        li.appendChild(closeBtn);
        // li.onclick = function(){
        //     li.classList.toggle("checked"); // yapıldı olarak işaretke
        //     updateTaskStatus(tastText, li.classList.contains("checked"));
        // };
        list.appendChild(li);
    }

    // toast bidirim gösterme fonksiyonu
    function showToast(type){
        if(type === "success"){
            toastSuccess.show();
        }else{
            toastError.show();
        }
    }


    // görevi local storage'a kaydet
    function saveTask(tastText){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push({text: tastText, completed: false});
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // görevi local storageden kaldır
    function removeTaskFromStorage(tastText){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task.text !== tastText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Kalem simgesine basunca görev güncelleme
    function updateTask(oldText, taskElement) {
        let newText = prompt("Yeni görevi gir:", oldText);
        
        if (newText && newText.trim() !== "") {
            let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
            // Eski görevi bul ve güncelle
            tasks = tasks.map(task => task.text === oldText ? { text: newText, completed: task.completed } : task);
            
            // Güncellenmiş görevi localStorage'a kaydet
            localStorage.setItem("tasks", JSON.stringify(tasks));
    
            // Ekranda görevi güncelle
            taskElement.firstChild.textContent = newText;
        }
    }
    

    // tamamlanma durumunu güncelle
    function updateTaskStatus(tastText, completed){
        let task = JSON.parse(localStorage.getItem("tasks")) || [];
        task.forEach(task => {
            if(task.text === tastText){
                task.completed = completed;
            }
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // sayfa yüklenince görevleri getiricek
    function loadTasks(){
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text);
            if(task.completed){
                list.lastChild.classList.add("checked");
            }
        });
    }

    // görevi dom'dan kadlır
    function removeTaskFromDOM(taskElement){
        taskElement.remove();
    }
});