

    //budget-controller
    const budgetController =  ( _ =>{
        
        const Expence = function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }

        const Income = function(id, description, value){
            this.id = id;
            this.description = description;
            this.value = value;
        }

        const data = {
            allItems: {
                exp: [],
                inc: []
            },
            totals: {
                exp: 0, 
                inc: 0
            }
        }

        return{
            addItem: ({type, des, val}) => {

                let newItem,ID;
                ID = data.allItems[type].length === 0 ? 0 : data.allItems[type][data.allItems[type].length - 1].id + 1;
                type === 'exp' ? newItem = new Expence(ID, des, val) : newItem = new Income(ID, des, val);
                data.allItems[type].push(newItem);
                return newItem;

            },
            testing: () => {
                console.log(data)
            },

            cacualteBudget: () => {

            }
           
        }
    })()


    //ui-controller
    const uiController =  (_=>{

        const domSelectors = {
            entryType: 'inputType',
            entryDesc: 'inputDescription',
            entryValue: 'inputValue',
            entryValueClass: '.input--description',
            entryDesClass: '.input--value',
            entryBtn: 'inputBtn',
            othersBlock: 'othersBlock',
            expensesEntryList: 'expensesEntryList',
            incomeEntryList: 'incomeEntryList'
            
        }
        const getbyID = (e) => document.getElementById(e);


        return{
            domSelectors,
            getbyID,
            getInput: _ => {
                return{
                    entryType: getbyID(domSelectors.entryType).value,
                    entryDesc: getbyID(domSelectors.entryDesc).value,
                    entryValue: parseFloat(getbyID(domSelectors.entryValue).value)
                }
            },
            addListItem: (obj, type) => {
                
                let html, newHtml, element;
                //Create HTML string with placeholder text
                if(type === 'inc'){
                    element = domSelectors.incomeEntryList
                    console.log(obj.id,type)
                    html =  `
                        <div id="income-%id%" class="income__entry">
                            <span class="entry__title">%des%</span>
                            <span class="entry__balance">%val%</span>
                            <span class="entry--remove">X</span>
                        </div>
                        `
                }else{
                    element = domSelectors.expensesEntryList
                    html = `
                    <div id="expenses-%id%" class="expenses__entry">
                        <span class="entry__title">%des%</span>
                        <span class="entry__balance">%val%</span>
                        <span class="entry--remove">X</span>
                     </div>
                    ` 
                }

                
                // Replace the placeholder text with some actual data
                newHtml = html.replace('%id%', obj.id)
                newHtml = newHtml.replace('%des%', obj.description)
                newHtml = newHtml.replace('%val%', obj.value)

                //Isert the HTML into the DOM
                getbyID(element).insertAdjacentHTML('beforeend',  newHtml);

            },
            clearFields: () => {
                let fields, fieldsArr;
                fields = document.querySelectorAll(domSelectors.entryValueClass+ ','+ domSelectors.entryDesClass);
                fieldsArr = Array.prototype.slice.call(fields);

                fieldsArr.forEach((element, index, array) => {
                    element.value = "";

                });
                fieldsArr[0].focus();
            }
        }
    })()

    //app-controller
    const appController =  ( (bdgtCtrl,UICtrl) =>{

        const updateBudget = () => {

            // Calculate the budget

            // return the budget

            //Display the budget in the UI


        }

        const ctrlAddItem = () => {
            // 1. Get the field input data
            const {entryType, entryDesc, entryValue} = UICtrl.getInput();

            if(entryDesc !== '' && isNaN(entryValue) && entryValue > 0){

                //2. Add the item to budget controller
                const newItem = bdgtCtrl.addItem({type :entryType, des: entryDesc, val:entryValue});

                //. Add the item to the UI 
                UICtrl.addListItem(newItem, entryType);
        
                //. Calculate and update budget on the UI
                updateBudget()
                
            }

            //. Clear Fields
            UICtrl.clearFields();


        }

        const ctrlDeleteItem = (e) => {
            let itemId;
            itemId = e.target.parentNode.parentNode.id;
            if(itemId){

            }

        }


        const setupEventListener = _ => {
            UICtrl.getbyID(UICtrl.domSelectors.entryBtn).addEventListener('click', ctrlAddItem);
            document.addEventListener('keypress', (e) => {
                if(e.keyCode === 13 || e.which === 13){
                    ctrlAddItem()
                }
            });
            UICtrl.getbyID(UICtrl.domSelectors.othersBlock).addEventListener('click', ctrlDeleteItem)
        }

       


   

        return{
           init:  _ => {
               console.log('Application has started.');
               setupEventListener();
           }
        }
    })(budgetController, uiController)



    appController.init();