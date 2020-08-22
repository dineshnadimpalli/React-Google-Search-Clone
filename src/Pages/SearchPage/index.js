import React from "react";
import "./SearchPage.css";
import { useStateValue } from "../../Store/StateProvider";
import useGoogleSearch from "../../utils/useGoogleSearch";
import dummyResponse from "../../utils/response.json";
import { Link } from "react-router-dom";
import Search from "../../Components/Search";
import SearchIcon from "@material-ui/icons/Search";
import DescriptionIcon from "@material-ui/icons/Description";
import ImageIcon from "@material-ui/icons/Image";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import RoomIcon from "@material-ui/icons/Room";
import MoreVertIcon from "@material-ui/icons/MoreVert";

export default function SearchPage() {
  const [state, dispatch] = useStateValue();
  // Live API call commented for development purpose
  // const { data } = useGoogleSearch(state.searchTerm)

  // Comment the below code and uncomment the above line to hit the actual api
  const data = dummyResponse;
  // console.log(data);
  // https://www.googleapis.com/customsearch/v1?[parameters]

  // To create a search engine follow this https://programmablesearchengine.google.com/about/
  return (
    <div className="searchPage">
      <div className="searchPage_header">
        <Link to="/">
          <img
            className="searchPage_logo"
            src="https://cdn.vox-cdn.com/thumbor/Ous3VQj1sn4tvb3H13rIu8eGoZs=/0x0:2012x1341/1400x788/filters:focal(0x0:2012x1341):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
            alt="Google Logo"
          />
        </Link>
        <div className="searchPage_header_body">
          <Search hideButtons />
          <div className="searchPage_options">
            <div className="searchPage_options_left">
              <div className="searchPage_option">
                <SearchIcon />
                <Link to="/all">All</Link>
              </div>
              <div className="searchPage_option">
                <DescriptionIcon />
                <Link to="/news">News</Link>
              </div>
              <div className="searchPage_option">
                <ImageIcon />
                <Link to="/images">Images</Link>
              </div>
              <div className="searchPage_option">
                <LocalOfferIcon />
                <Link to="/shopping">Shopping</Link>
              </div>
              <div className="searchPage_option">
                <RoomIcon />
                <Link to="/maps">Maps</Link>
              </div>
              <div className="searchPage_option">
                <MoreVertIcon />
                <Link to="/more">More</Link>
              </div>
            </div>
            <div className="searchPage_options_right">
              <div className="searchPage_option">
                <Link to="/settings">Settings</Link>
              </div>
              <div className="searchPage_option">
                <Link to="/tools">Tools</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(true || state.searchTerm) && (
        <div className="searchPage_results">
          <p className="searchPage_results_count">
            About {data?.searchInformation.formattedTotalResults} results in (
            {data?.searchInformation.formattedSearchTime}) seconds
          </p>

          {data?.items.map((result) => (
            <div className="searchPage_result">
              <a className="searchPage_result_title" href={result.link} target="_blank">
                <h2>{result.title}</h2>
              </a>
              <a href={result.link} className="searchPage_result_link" target="_blank">
                {
                  result.pagemap?.cse_image?.length > 0 &&
                  result.pagemap?.cse_image[0]?.src && 
                  (
                    <img
                      className='searchPage_result_image'
                      src={result.pagemap?.cse_image[0]?.src}
                      alt='result_image'
                    />
                  )
                }
                <span>{result.displayLink}</span>
              </a>
              <p className="searchPage_result_snippet">{result.snippet}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
