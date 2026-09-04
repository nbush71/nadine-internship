import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";


const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchTopSellers() {
    const response = await fetch(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    const data = await response.json();
    setTopSellers(data);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchTopSellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
          <div className="col-md-12">
            <ol className="author_list">
            {isLoading ? (
                topSellers.slice().map((_, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to="/author/">
                            <Skeleton width={50} height={50} borderRadius={500} />
                            <i className="fa fa-check"></i>
                          </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to="/author/">
                            <Skeleton width={50} height={20} />
                          
                      </Link>
                            <span>
                              <Skeleton width={20} height={20} />
                            </span>
                  </div>
                </li>
              ))
              ) : ( 
              topSellers.slice().map((item, index) => (
                <li key={index}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>
                      {item.authorName}
                    </Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
              ))
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
