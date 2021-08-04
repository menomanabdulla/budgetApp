

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

        const calculateTotal = (type) => {
            let sum = 0;
            data.allItems[type].forEach(item => {
                sum += item.value;
            })
            data.totals[type] = sum;
            return sum;
        }

        const data = {
            allItems: {
                exp: [],
                inc: []
            },
            totals: {
                exp: 0, 
                inc: 0
            },
            budget: 0,
            percentage: -1,
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
                //Calculate sum of income and expenses
                calculateTotal('inc');
                calculateTotal('exp');
                //Calculate the budget: income - expenses
                data.budget = data.totals.inc - data.totals.exp;
                //Calculate the percentage of income that we spent
                if (data.totals.inc > 0){
                    data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
                }else{
                    data.percentage = -1;
                }

            },
            getBudget: _ => {
                return{
                    budget: data.budget,
                    totalInc: data.totals.inc,
                    totalExp: data.totals.exp,
                    percentage: data.percentage
                }
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
            incomeEntryList: 'incomeEntryList',
            budgetValue: 'budgetValue',
            incomeAmmount: 'incomeAmmount',
            expensesAmmount: 'expensesAmmount',
            expensesPercentage: 'expensesPercentage'
            
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
            },
            displayBudget: (obj) => {
                getbyID(domSelectors.budgetValue).textContent = obj.budget;
                getbyID(domSelectors.incomeAmmount).textContent = obj.totalInc;
                getbyID(domSelectors.expensesAmmount).textContent = obj.totalExp;
                if(obj.percentage > 0){
                    getbyID(domSelectors.expensesPercentage).textContent = obj.percentage+'%';
                }else{
                    getbyID(domSelectors.expensesPercentage).textContent = '---';
                }
            }
        }
    })()

    //app-controller
    const appController =  ( (bdgtCtrl,UICtrl) =>{

        const updateBudget = () => {
            let budgetData;
            // Calculate the budget
            bdgtCtrl.cacualteBudget();

            // return the budget
            budgetData = bdgtCtrl.getBudget();

            //Display the budget in the UI
            UICtrl.displayBudget(budgetData);

        }

        const ctrlAddItem = () => {
            // 1. Get the field input data
            const {entryType, entryDesc, entryValue} = UICtrl.getInput();

            if(entryDesc !== '' && !isNaN(entryValue) && entryValue > 0){

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
               UICtrl.displayBudget({
                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
               });
           }
        }
    })(budgetController, uiController)



    appController.init();