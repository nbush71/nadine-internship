import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AuthorItems = ({ items, authorImage, isLoading }) => {

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {isLoading ? (
            <>
              {new Array(8).fill(0).map((_, index) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={index}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <Skeleton 
                            width={50}
                            height={50}
                            circle />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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
                      <Link to="/item-details">
                          <Skeleton
                            width="100%"
                            height={200}
                            borderRadius={10}
                          />
                        </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <Skeleton width={50} height={20} />
                      </Link>
                      <div className="nft__item_price">
                        <Skeleton width={10} height={20} /> ETH
                      </div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span><Skeleton width={10} height={20} /></span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {items.map(({ likes, nftId, nftImage, price, title }) => (
                <div
                  className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  key={nftId}
                >
                  <div className="nft__item">
                    <div className="author_list_pp">
                      <Link to="">
                        <img className="lazy" src={authorImage} alt="" />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
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
                      <Link to="/item-details">
                        <img
                          src={nftImage}
                          className="lazy nft__item_preview"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>{title}</h4>
                      </Link>
                      <div className="nft__item_price">{price} ETH</div>
                      <div className="nft__item_like">
                        <i className="fa fa-heart"></i>
                        <span>{likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;