import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const NewItems = () => {
  const [items, setItems] = useState([]);
  //const [isLoading, setIsLoading] = useState(true);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 12,
    },
    breakpoints: {
      "(max-width: 768px)": {
        slides: { perView: 1, spacing: 10 },
      },
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 10 },
      },
    },
  });

  async function fetchItems() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );

    const data = await response.json();
    setItems(data);
  }

  useEffect(() => {
    fetchItems();
    if (items.length && instanceRef.current) {
    instanceRef.current.update();
  }
}, [items, instanceRef]);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="new-items-slider">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="d-nav-left"
            >
              <i className="fa fa-chevron-left"></i>
            </button>
            <div ref={sliderRef} className="keen-slider">
              {items.slice(0, 4).map((item, index) => (
                <div className="keen-slider__slide" key={index}>
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="/author">
                        <img className="lazy" src={item.authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div className="de_countdown">5h 30m 32s</div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to={`/item-details/${item.id}`}>
                        <img
                          src={item.nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to={`/item-details/${item.id}`}>
                        <h4>{item.title}</h4>
                      </Link>
                      <div className="nft__item_price">{item.price}</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{item.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => instanceRef.current?.next()}
              className="d-nav-right">
              <i className="fa fa-chevron-right"></i>
            </button>
          </div>
          </div>
        </div>
    </section>
  );
};

export default NewItems;