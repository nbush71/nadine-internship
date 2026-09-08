import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
  let timeout;

  async function fetchCollections() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );

    const data = await response.json();
    setCollections(data);

    timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  fetchCollections();

  return () => clearTimeout(timeout);
}, []);

  return (
    <section id="section-collections" className="no-bottom" data-aos="fade-up" data-aos-delay="200">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>

        <div className="hot-collections-slider">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="d-nav-left"
          >
            <i className="fa fa-chevron-left"></i>
          </button>

          <div ref={sliderRef} className="keen-slider">
            {isLoading ? (
              <>
                {new Array(9).fill(0).map((_, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <Skeleton
                            width={300}
                            height={200}
                            borderRadius={10}
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <Skeleton width={50} height={50} borderRadius={500} />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <Skeleton width={50} height={20} />
                        </Link>
                        <Skeleton width={20} height={10} />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {collections.map((collections, id, title, authorImage, nftImage, nftId, authorId, code, index) => (
                  <div className="keen-slider__slide" key={index}>
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to={`/item-details/${nftId}`}>
                          <img
                            src={nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to={`/author/${authorId}`}>
                          <img
                            className="lazy pp-coll"
                            src={authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{title}</h4>
                        </Link>
                        <span>{code}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <button
            onClick={() => instanceRef.current?.next()}
            className="d-nav-right"
          >
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;