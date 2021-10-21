import React from 'react';
import s from "./InfoPage.module.css";

function InfoPage(props) {
    return (
        <div className={s.info_page} >

            <div className={s.article}>
                <span id={"rotang"} > </span>

                <h2 className={s.article_header} >About Rotang</h2>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus cumque debitis dicta dolorem ducimus eos facilis inventore iste laboriosam laudantium magnam maiores minus nihil, nisi nostrum obcaecati, officiis optio perspiciatis quisquam quo repellendus sapiente soluta temporibus veritatis vero voluptate. Architecto aut blanditiis consequatur cum cumque distinctio dolore doloremque eligendi et explicabo id in laboriosam libero magni necessitatibus nesciunt odit praesentium reprehenderit soluta tempore, vel voluptate voluptatibus. Aliquid commodi culpa cumque dignissimos dolores eius eos facere, ipsam minima porro quas repellendus sed ullam? Ab cupiditate error facilis minus nam quia repellendus tempora unde veniam. Consectetur consequatur debitis eius obcaecati ullam?
            </div>

            <div className={s.article}>
                <span id={"us"} > </span>

                <h2 className={s.article_header}>Us</h2>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus cumque debitis dicta dolorem ducimus eos facilis inventore iste laboriosam laudantium magnam maiores minus nihil, nisi nostrum obcaecati, officiis optio perspiciatis quisquam quo repellendus sapiente soluta temporibus veritatis vero voluptate. Architecto aut blanditiis consequatur cum cumque distinctio dolore doloremque eligendi et explicabo id in laboriosam libero magni necessitatibus nesciunt odit praesentium reprehenderit soluta tempore, vel voluptate voluptatibus. Aliquid commodi culpa cumque dignissimos dolores eius eos facere, ipsam minima porro quas repellendus sed ullam? Ab cupiditate error facilis minus nam quia repellendus tempora unde veniam. Consectetur consequatur debitis eius obcaecati ullam?
            </div>

            <div className={s.article}>
                <span id={"delivery"}> </span>

                <h2 className={s.article_header} >Delivery</h2>

                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, accusamus cumque debitis dicta dolorem ducimus eos facilis inventore iste laboriosam laudantium magnam maiores minus nihil, nisi nostrum obcaecati, officiis optio perspiciatis quisquam quo repellendus sapiente soluta temporibus veritatis vero voluptate. Architecto aut blanditiis consequatur cum cumque distinctio dolore doloremque eligendi et explicabo id in laboriosam libero magni necessitatibus nesciunt odit praesentium reprehenderit soluta tempore, vel voluptate voluptatibus. Aliquid commodi culpa cumque dignissimos dolores eius eos facere, ipsam minima porro quas repellendus sed ullam? Ab cupiditate error facilis minus nam quia repellendus tempora unde veniam. Consectetur consequatur debitis eius obcaecati ullam?
            </div>
        </div>
    );
}

export default InfoPage;