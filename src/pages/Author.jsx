import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Skeleton from "../components/UI/Skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Author = () => {
  const { id: paramsId } = useParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
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
    const response = await fetch(
    `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${paramsId}`
  );

    const author = await response.json();
    
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
    setIsLoading(false);
  }

  useEffect(() => {
    fetchItems();
    window.scrollTo(0, 0);
  }, [paramsId]);

  if (!author) return null;

  return (
    <div id="wrapper" data-aos="fade-in" data-aos-easing="ease" data-aos-delay="500">
      <div className="no-bottom no-top" id="content" >
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
                {isLoading ? (
                  <>
                    <div className="d_profile de-flex">
                      <div className="de-flex-col">
                        <div className="profile_avatar">
                          <Skeleton 
                            width={150}
                            height={150}
                            borderRadius={500}/>

                          <i className="fa fa-check"></i>
                          <div className="profile_name">
                            <h4><Skeleton width={50} height={20} />
                              <span className="profile_username">
                                <Skeleton  width={20} height={30} /></span>
                              <span id="wallet" className="profile_wallet">
                                <Skeleton width={100} height={20}/>
                              </span>
                              <button id="btn_copy" title="Copy Text">
                                <Skeleton width={40} height={20} />
                              </button>
                            </h4>
                          </div>
                        </div>
                      </div>
                      <div className="profile_follow de-flex">
                        <div className="de-flex-col">
                          <div className="profile_follower">
                            <Skeleton width={50} height={20} />
                          </div>
                          <Link to="#" className="btn-main">
                            <Skeleton width={50} height={20} />
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
                            {author.authorName}
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
                          {Number(author.followers) + (isFollowing ? 1 : 0)} followers
                        </div>
                        <button className="btn-main" 
                          onClick={() => setIsFollowing((prev) => !prev)}>
                          {isFollowing ? "Unfollow" : "Follow"}
                        </button>
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
                    isLoading={isLoading}
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