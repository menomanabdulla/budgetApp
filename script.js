

    //budget-controller
    const budgetController =  (_=>{
     
        return{
           
        }
    })()

    //ui-controller
    const uiController =  (_=>{

        const domSelectors = {
            entryType: 'inputType',
            entryDesc: 'inputDescription',
            entryValue: 'inputValue',
            entryBtn: 'inputBtn',
            
        }
        const getbyID = (e) => document.getElementById(e);

        

        return{
            domSelectors,
            getbyID,
            getInput: _ => {
                return{
                    entryType: getbyID(domSelectors.entryType).value,
                    entryDesc: getbyID(domSelectors.entryDesc).value,
                    entryValue: getbyID(domSelectors.entryValue).value
                }
            }
        }
    })()

    //app-controller
    const appController =  ( (bdgtCtrl,UICtrl) =>{

        const ctrlAddItem = () => {
            // 1. Get the field input data
            var input = UICtrl.getInput();
            console.log(input)
            //2. Add the item to budget controller

            //. Add the item to the UI 

            //. Calculate the budget

            //5. Display the budget on the UI

        }



        UICtrl.getbyID(UICtrl.domSelectors.entryBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13 || e.which === 13){
                ctrlAddItem()
            }
        });

        return{
           
        }
    })(budgetController, uiController)



