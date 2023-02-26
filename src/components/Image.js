import React, { Component } from "react";
import ImageDetail from "./ImageDetail/ImageDetail";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
export default class Image extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      results: [],
      loading: false,
      page: 1,
      total_results: 0,
    };
  }

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    let url = `https://api.unsplash.com/search/photos?query=${this.props}&client_id=OZzKtYmEyXl2T5_oPDzuNd-h1VGbuEzHYYpl5-BdW90&per_page=9`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      results: parseData.results,
      total_results: parseData.total,
      loading: false,
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.category !== this.props.category) {
      this.setState({
        loading: true,
      });
      let url = `https://api.unsplash.com/search/photos?query=${this.props.category}&client_id=OZzKtYmEyXl2T5_oPDzuNd-h1VGbuEzHYYpl5-BdW90&per_page=9`;
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        results: parseData.results,
        total_results: parseData.total,
        loading: false,
      });
    }
  }

  fetchMoreData = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    let url = `https://api.unsplash.com/search/photos?query=${this.props.category}&client_id=OZzKtYmEyXl2T5_oPDzuNd-h1VGbuEzHYYpl5-BdW90&page=${this.state.page}&per_page=9`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      total_results: parseData.total,
      results: this.state.results.concat(parseData.results),
      loading: false,
    });
  };
  render() {
    return (
      <div className="container">
        <h2 className="text-center">
          {
            <span>
              {this.props.category !== "random"
                ? this.props.category.charAt(0).toUpperCase() +
                  this.props.category.slice(1)
                : null}{" "}
            </span>
          }
          Image gallery
        </h2>
        <InfiniteScroll
          dataLength={this.state.results.length}
          next={this.fetchMoreData}
          hasMore={this.state.results.length !== this.state.total_results}
          loader={<Spinner />}
        >
          <div>
            <div className="row">
              {this.state.results.map((element, ind) => {
                return (
                  <div key={ind} className="col-md-4 col-sm-6 col-12">
                    <ImageDetail
                      image_url={element.urls.small}
                      user_image={element.user.profile_image.small}
                      user_name={element.user.name}
                      likes={element.likes}
                      user_id={element.user.instagram_username}
                      desc={element.alt_description}
                      twitter_id={element.user.social.twitter_username}
                      tags={element.tags}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}
