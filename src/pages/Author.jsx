import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Skeleton from "../components/UI/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const { id: paramsId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [author, setAuthor] = useState({
    address: "",
    tag: "",
    authorId: "",
    authorImage: "",
    authorName: "",
    followers: "",
    id: "",
  });

  async function fetchItems() {
    const [newItemsResponse, topSellersResponse, authorsResponse] =
      await Promise.all([
        fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
        ),
        fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
        ),
        fetch(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${paramsId}`,
        ),
      ]);

    const newItems = await newItemsResponse.json();
    const topSellers = await topSellersResponse.json();
    const author = await authorsResponse.json();
    setLoading(false);
    const {
      address,
      authorId,
      authorImage,
      authorName,
      followers,
      id,
      tag,
      nftCollection,
    } = author;

    setAuthor({
      address,
      authorId,
      authorImage,
      authorName,
      followers,
      id,
      tag,
    });

    setItems(nftCollection);
  }

  useEffect(() => {
    fetchItems();
    window.scrollTo(0, 0);
  }, []);

  if (!author) return null;

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                {loading ? (
                  <>
                    {/* INCLUDE SKELETON LOADING STATE HERE */}
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton />
                          <img src={author.authorImage} alt="" />

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4>
                              {author.title}
                              <span className="profile_username">
                                @{author.tag}
                              </span>
                              <span id="wallet" className="profile_wallet">
                                {author.address}
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                Copy
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            {author.followers} followers
                          </div>
                          <Link to="#" className="btn-main">
                            Follow
                          </Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="d_profile de-flex">
                    <div className="de-flex-col">
                      <div className="profile_avatar">
                        <img src={author.authorImage} alt="" />

                        <i className="fa fa-check"></i>
                        <div className="profile_name">
                          <h4>
                            {author.title}
                            <span className="profile_username">
                              @{author.tag}
                            </span>
                            <span id="wallet" className="profile_wallet">
                              {author.address}
                            </span>
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="profile_follow de-flex">
                      <div className="de-flex-col">
                        <div className="profile_follower">
                          {author.followers} followers
                        </div>
                        <Link to="#" className="btn-main">
                          Follow
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    items={items}
                    authorImage={author.authorImage}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;