import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const { isLoading } = useState([]);
  
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 4,
      spacing: 12,
    },
    if(loading) {
      return <div>Loading...</div>;
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

  async function fetchCollections() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    const data = await response.json();
    setCollections(data);
  }

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
        </div>
        <Skeleton height={200} width={100} borderRadius={20} />
        <div className="hot-collections-slider">
          <button onClick={() => instanceRef.current?.prev()} className="d-nav-left">
            <i className="fa fa-chevron-left"></i>
          </button>
          <div ref={sliderRef} className="keen-slider">
            {collections.map((collection, index) => (
              <div className="keen-slider__slide" key={index}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to="/item-details">
                      <img
                        src={collection.nftImage}
                        className="lazy img-fluid"
                        alt=""
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/author">
                      <img
                        className="lazy pp-coll"
                        src={collection.authorImage}
                        alt=""
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{collection.title}</h4>
                    </Link>
                    <span>{collection.code}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => instanceRef.current?.next()} className="d-nav-right">
            <i className="fa fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;