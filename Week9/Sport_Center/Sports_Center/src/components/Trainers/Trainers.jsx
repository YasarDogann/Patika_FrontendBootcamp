import React from "react";

const Trainers = () => {
    const trainers = [
        {
            name: "Vicccccctoooorrrr Osimhen :D",
            specialty : "Fenere Koyma Uzmanı",
            image: "/images/osi.jpg"
        },
        {
            name: "Maurooo Icardi",
            specialty : "Fener'in Kocası",
            image: "/images/mi.jpg"
        },
        {
            name: "Yaşar Doğan",
            specialty : "Kudurtma Uzmanı",
            image: "/images/osi.jpg"
        },
    ];

    return (
        <section className="trainer" id="trainer">
            <div className="trainer-container">
                <h2>FENERİN KOCALARI</h2>
                <div className="line"></div>
                <p>
                    Dikkat Fenerliler bu alanı geçsin. Zira istenmeyen anılar akıllara gelebilir huhahah
                </p>
                <div className="trainers-container">
                    {trainers.map((trainer, index) => (
                        <div className="trainer-portfolio" key={index}>
                            <img src={trainer.image} alt={trainer.name} />
                            <div className="trainer-layer">
                                <h4>{trainer.name}</h4>
                                <p>{trainer.specialty}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Trainers;