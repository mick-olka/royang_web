import React from 'react';

function Sales(props) {
    return (
        <div>
            <h2 style={{fontSize: "3rem", margin: "1rem 5rem", fontWeight: "bolder"}} >Знижки</h2>
            <br/>
            {/*<p>Шановні покупці!</p>*/}
            {/*<br/>*/}
            <p>В нашому Інтернет-магазині існує постійна система знижок:</p>
            <p>При одноразовому замовленні товару на суму (при умові замовлення через сайт он-лайн):</p>
            <p>от 7000,00 грн. - 2%,</p>
            <p>от 15000,00 грн. - 3%,</p>
            <p>от 30000,00 грн. - 4%,</p>
            <p>от 50000,00 грн. - 5%,</p>
            <p>от 80000,00 грн. - 6%,</p>
            <p>от 100000,00 грн. - % уточнюється безпосередньо з менеджером.</p>

        </div>
    );
}

export default Sales;