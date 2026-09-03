import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function futureTime(endTime) {
  const currentTime = new Date();
  const endDateTime = new Date(endTime);
  const timeDifference = endDateTime - currentTime;

  if (timeDifference <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (timeDifference % (1000 * 60)) / 1000
  );

  return { hours, minutes, seconds };
}

const NewItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setTick] = useState(0);

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
    setIsLoading(false);
  }

  useEffect(() => {
    fetchItems();

  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((tick) => tick + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      instanceRef.current?.update();
    }
  }, [items]);

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
              {isLoading ? (
                <>
                  {[1, 2, 3, 4].map((_, index) => (
                    <div className="keen-slider__slide" key={index}>
                      <div className="nft__item">
                        <div className="author_list_pp">
                          <Link to="/author/">
                            <Skeleton width={50} height={50} borderRadius={500} />
                          </Link>
                        </div>
                        <div className="de_countdown">
                          <Skeleton width={100} height={20} />
                        </div>
                        <div className="nft__item_wrap">
                          <Link to="/item-details">
                            <Skeleton width={307} height={400} borderRadius={10} />
                          </Link>
                        </div>
                        <div className="nft__item_info">
                          <Link to="/item-details">
                            <Skeleton width={100} height={20} />
                          </Link>
                          <div className="nft__item_price">
                            <Skeleton width={100} height={20} />
                          </div>
                          <div className="nft__item_like">
                            <i className="fa fa-heart"></i>
                            <span>
                              <Skeleton width={20} height={20} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                items.map((item, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link to="/author/">
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      {new Date(item.expiryDate) > new Date() && (
                        <div className="de_countdown">
                          {futureTime(item.expiryDate).hours}h{" "}
                          {futureTime(item.expiryDate).minutes}m{" "}
                          {futureTime(item.expiryDate).seconds}s
                        </div>
                      )}
                      <div className="nft__item_wrap">
                        <Link to={`/item-details/${item.id}`}>
                          <img src={item.nftImage} className="lazy nft__item_preview" alt="" />
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
                ))
              )}
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