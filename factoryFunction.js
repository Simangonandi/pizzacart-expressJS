module.exports = function cart() {
    let smallQty = 0;
    let medQty = 0;
    let largeQty = 0;

    let smallCost = 0;
    let medCost = 0;
    let largeCost = 0;
    let totalCart = 0;

    let changeAmt = 0;

    let checkVar = true;
    let payVar = true;
    let messageVar = true;

    function btnClickff(event) {
        if (event === "smallAdd") {
            smallQty++;
        } else if (event === "medAdd") {
            medQty++;
        } else if (event === "largeAdd") {
            largeQty++;
        }

        if (event === "smallMin") {
            smallQty--;
            if (smallQty < 0) {
                smallQty = 0;
            }
        } else if (event === "medMin") {
            medQty--;
            if (medQty < 0) {
                medQty = 0;
            }
        } else if (event === "largeMin") {
            largeQty--;
            if (largeQty < 0) {
                largeQty = 0;
            }
        }
    }

    function qtyUpdate() {
        return {
            smallQty,
            medQty,
            largeQty
        }
    }

    function priceUpdate() {
        smallCost = (smallQty * 39).toFixed(2);
        medCost = (medQty * 79).toFixed(2);
        largeCost = (largeQty * 99).toFixed(2);
        totalCart = (smallQty * 39.00 + medQty * 79.00 + largeQty * 99.00).toFixed(2);

        return {
            smallCost,
            medCost,
            largeCost,
            totalCart
        }
    }

    function calChange(amt) {
        changeAmt = (amt - totalCart).toFixed(2);
    }

    function getChange() {
        return changeAmt;
    }

    function resetCart() {
        smallQty = 0;
        medQty = 0;
        largeQty = 0;
        smallCost = 0;
        medCost = 0;
        largeCost = 0;
        totalCart = 0;
        changeAmt = 0;

        return {
            smallQty,
            medQty,
            largeQty,
            smallCost,
            medCost,
            largeCost,
            totalCart,
            changeAmt
        }
    }

    function setBoolen(name, boolen) {
        if (name == 'check') {
            if (boolen == true) {
                checkVar = true;
            } else if (boolen == false) {
                checkVar = false;
            }
        } else if (name == 'pay') {
            if (boolen == true) {
                payVar = true;
            } else if (boolen == false) {
                payVar = false;
            }
        } else if (name == 'message') {
            if (boolen == true) {
                messageVar = true;
            } else if (boolen == false) {
                messageVar = false;
            }
        }
    }

    function getBoolen() {
       return {
        checkVar,
        payVar,
        messageVar
       }
    }

    return {
        btnClickff,
        qtyUpdate,
        priceUpdate,
        calChange,
        getChange,
        resetCart,
        setBoolen,
        getBoolen
    }


}