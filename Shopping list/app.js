const addItemBtn = document.getElementById('add-item-btn');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const filterAllBtn = document.getElementById('filter-all');
const filterPurchasedBtn = document.getElementById('filter-purchased');
const filterUnpurchasedBtn = document.getElementById('filter-unpurchased');

const items = [];

addItemBtn.addEventListener('click', function() {
    const itemName = itemInput.value.trim(); // Получаем текст из input

    if (itemName !== "") {
        const newItem = {
            name: itemName,
            purchased: false
        };

        items.push(newItem);
        updateItemList(); 

        itemInput.value = "";
    } else {
        alert("Please enter an item name.");
    }
});


function deleteItem(index) {
    items.splice(index, 1); 
    updateItemList(); 
}


function togglePurchased(index) {
    items[index].purchased = !items[index].purchased; 
    updateItemList();
}


function updateItemList(filter = null) {
    itemList.innerHTML = ""; 

    items.forEach((item, index) => {
        if (filter === null || item.purchased === filter) {
            const li = document.createElement('li');
            li.textContent = item.name;

            const purchaseBtn = document.createElement('button');
            purchaseBtn.textContent = item.purchased ? 'Unpurchased' : 'Purchased';
            purchaseBtn.addEventListener('click', () => togglePurchased(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => deleteItem(index));

            li.appendChild(purchaseBtn);
            li.appendChild(deleteBtn);
            itemList.appendChild(li);
        }
    });
}

filterAllBtn.addEventListener('click', () => updateItemList(null)); 
filterPurchasedBtn.addEventListener('click', () => updateItemList(true)); 
filterUnpurchasedBtn.addEventListener('click', () => updateItemList(false));