// =======================================
// TypeScript-like Interface (for understanding)
// interface User {
//    id: number;
//    name: string;
//    email: string;
// }
// =======================================
// API Layer (Async Programming)
const UserAPI = {
    fetchUsers: async function () {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const success = true;
                if (success) {
                    resolve([
                        { id: 1, name: "jagadeesh", email: "jagadeesh@gmail.com" },
                        { id: 2, name: "vignesh", email: "vignesh@gmail.com" },
                        { id: 3, name: "Laksman", email: "laksman@gmail.com" },
                        { id: 4, name: "Deepak", email: "deepak@gmail.com" },
                        { id: 5, name: "ram", email: "ram@gmail.com" },
                        { id: 6, name: "suresh", email: "suresh@gmail.com" },
                        { id: 7, name: "rakesh", email: "rakesh@gmail.com" },
                        { id: 8, name: "mahesh", email: "mahesh@gmail.com" },
                        { id: 9, name: "radha", email: "radha@gmail.com" },
                        { id: 10, name: "anitha", email: "anitha@gmail.com" }
                    ]);
                } else {
                    reject("Failed to fetch users");
                }
            }, 2000);
        });
    }
};
// UI Layer
const UI = {
    displayUsers(users) {
        const userList = document.getElementById("userList");
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = `${user.name} - ${user.email}`;
            userList.appendChild(li);
        });
    }
};
// Controller Layer
async function loadUsers() {
    try {
        console.log("Loading users...");
        const users = await UserAPI.fetchUsers();
        UI.displayUsers(users);
        console.log("Users loaded successfully");
    } catch (error) {
        console.error("Error:", error);
        alert("Something went wrong!");
    }
}