import React from 'react';
import s from "./InfoPage.module.css";

function Colors({colors}) {

    const getSrcByName = (name) => {
        return colors.find(c => c.name===name).src;
    }

    return (
        <div className={s.colors_div}>

            <table >
                <tbody>
                <tr>
                    <td >
                        <h1 className={s.article_header} >Вибір кольору</h1>
                        <span >
      <p><span><strong>1. Варіанти кольору меблів із натурального ротанга:</strong></span></p>
                             <br/><br/>
<p>1.1. Коньяк</p>
<p><img
    src={getSrcByName("коньяк")}
    alt="color" width="290" height="280"/></p>
<p>1.2. Шоколад</p>
<p><img
    src={getSrcByName("шоколад")}
    alt="color" width="285" height="298"/></p>
<p>1.3. Олива</p>
<p><img src={getSrcByName("олива")} alt="color" width="285" height="223"/></p>
<p>1.4. Мед</p>
<p><img src={getSrcByName("мед")} alt="color" width="287" height="256"/></p>
<p>1.5. Кава</p>
<p>&nbsp;</p>
<p><img src={getSrcByName("кава")} alt="color"/></p>
<p>&nbsp;</p>
<p><span><strong>2.Варіанти кольору плетіння для виробів із штучного ротанга:</strong></span></p>
<p><span><strong>Цех плетіння №1</strong></span></p>
                             <br/><br/>
<h3>2.1. Білий</h3>
<p><img src={getSrcByName("білий")} alt="color" width="350" height="350"/></p>
<p><img src={getSrcByName("білий_столик")}
        alt="color" width="350" height="405"/></p>
<h3>2.2. Крем</h3>
<p><img src={getSrcByName("крем")} alt="color" width="350"
        height="350"/></p>
<p><img src={getSrcByName("крем_крісло")} alt="color" width="349"
        height="604"/></p>
<p>&nbsp;</p>
<h3>2.3. Сірий</h3>
<p><img src={getSrcByName("сірий")} alt="color" width="350" height="350"/></p>
<p><img src={getSrcByName("сірий_крісло")} alt="color" width="350"
        height="328"/></p>
<h3>2.4. Коричневий</h3>
<p><img src={getSrcByName("коричневий")} alt="color" width="350"
        height="350"/></p>
<p><img src={getSrcByName("коричневий_крісло")} alt="color" width="350"
        height="356"/></p>
<h3>2.5. Графіт</h3>
<p><img
    src={getSrcByName("графіт")}
    alt="color" width="350" height="347"/></p>
<p><img src={getSrcByName("графіт_крісло")} alt="color" width="346"
        height="439"/></p>
<h3>2.6. Чорний</h3>
<p><img src={getSrcByName("чорний")} alt="color" width="350"
        height="341"/></p>
<p><img src={getSrcByName("чорний_крісло")} alt="color" width="350"
        height="379"/></p>
<p><span><strong>3.Варіанти кольору тканини для меблів зі штучного ротанга:</strong></span></p>
                            <br/><br/>
<p><span><strong>Тканина №1</strong></span></p>
<p><span><strong>&nbsp;</strong></span><span><strong><img
    src={getSrcByName("тканина_1")}
    alt="color"/></strong></span></p>

<p><span><strong><strong>Тканина №2</strong></strong></span></p>
<p><img src={getSrcByName("тканина_2")}
        alt="color" width="220" height="221"/></p>

<p><span><strong><strong>Тканина №3</strong></strong></span></p>
<p><img
    src={getSrcByName("тканина_3")}
    alt="color" width="221" height="221"/></p>
<p><span><strong><strong><strong><strong>Тканина №4</strong></strong></strong></strong></span></p>
<p><img src={getSrcByName("тканина_4")}alt="color" width="220"
        height="220"/></p>
<p><span><strong>Тканина №5</strong></span></p>
<p><span><strong><img
    src={getSrcByName("тканина_5")} alt="color" width="217"
    height="217"/></strong></span></p>
<p><span
><strong><strong><strong><strong><strong><strong>Тканина №6 з пропиткою</strong></strong></strong></strong></strong></strong></span></p>
<p><img src={getSrcByName("тканина_6_пропитка")} alt="color" width="220"
        height="220"/></p>
<p><span><strong>Тканина №7 з пропиткою</strong></span></p>
<p><span><img
    src={getSrcByName("тканина_7_пропитка")} alt="color" width="220"
    height="219"/></span></p>
    </span>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

    );
}

export default Colors;