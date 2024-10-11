'use client';

import React, { useEffect, useReducer, useState } from "react";
import Godowns from "./database/godowns.json";
import Items from "./database/items.json";
import WarehouseSVG from "./assets/warehouse.svg";
import FolderSVG from "./assets/folder.svg";
import FolderOpenSVG from "./assets/folder-open.svg";
import FileSVG from "./assets/file.svg";
import PlaceholderImage from "./assets/placeholder.jpg";
import SearchSVG from "./assets/search.svg";

import Image from "next/image";

let GLOBAL_CONFIG = null;
let lastSelectedItem = null;
let selectedItem = null;

class Godown {

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.items = [];
    this.children = [];
    this.parent = null;
    this.height = 1;
  }

  addItem(item) {
    this.items.push(item);
  }

  addChild(godown) {
    godown.parent = this;
    godown.setHeight(this.height + 1);

    this.children.push(godown);
  }

  setHeight(height) {
    this.height = height;
  }
};

const configGodowns = () => {
  let gdict = {};

  for (let godown of Godowns) {
    gdict[godown.id] = new Godown(godown.id, godown.name);

    if (godown.parent_godown) {

      // Condition is always false
      // if (!gdict[godown.parent_godown]) {

      //   gdict[godown.parent_godown] = new Godown(godown.parent_godown, Godowns.find(g => g.id === godown.parent_godown).name);
      // }

      gdict[godown.parent_godown].addChild(gdict[godown.id]);
    }
  }

  for (let item of Items) {
    gdict[item.godown_id].addItem(item);
  }

  return gdict;
};

const FolderView = ({ godown }) => {
  return (
    <div className="folder-view">
      <div className="folder-title">
        <div className="clm-inline">
          <Image src={FolderSVG} alt="Warehouse" width={20} height={20} />

          <Image src={FolderOpenSVG} alt="Warehouse" width={20} height={20} className="disp-hide" />
        </div>
        <div className="clm-inline" onClick={(e) => {
          e.preventDefault();

          e.currentTarget.parentElement.parentElement.querySelector(".folder-content").classList.toggle("folder-collapse");

          e.currentTarget.parentElement.querySelector('.clm-inline').querySelectorAll('img')[0].classList.toggle("disp-hide");

          e.currentTarget.parentElement.querySelector('.clm-inline').querySelectorAll('img')[1].classList.toggle("disp-hide");
        }}>
          {godown.name}
        </div>
      </div>
      <div className="folder-content folder-collapse">
        {godown.children.map((child) => (
          <FolderView godown={child} key={child.id} />
        ))}
        <br />
        {godown.items.map((item) => (
          <div className="folder-item" key={item.id} onClick={() => {
            lastSelectedItem = selectedItem;
            selectedItem = item;
          }}>
            <div className="clm-inline">
              <Image src={FileSVG} alt="Warehouse" width={20} height={20} />
            </div>
            <div className="clm-inline">
              {item.name}
            </div>
          </div>
        ))}
        <br />
      </div>

      {godown.height === 1 ? <br /> : null}
    </div>
  );
};

const Product = (props) => {
  let obj = props["obj"];
  let location_arr = [];

  Godowns.find((godown) => {
    if (godown.id === obj["godown_id"]) {
      location_arr.push(godown.name);
      return true;
    }
  });

  let parent_godown = GLOBAL_CONFIG[obj["godown_id"]].parent;

  while (parent_godown) {
    location_arr.push(parent_godown.name);
    parent_godown = parent_godown.parent;
  }

  location_arr = location_arr.reverse();
  console.log(location_arr);

  return (
    <div className="product">
      <div className="breadcrumb">
        <span>Home</span>
        {location_arr.map((location, index) => (
          <span key={index} style={{ color: "rgb(201,201,201)" }}> &gt; <span>{location}</span></span>
        ))}
      </div>
      <div className="clm">
        <Image src={obj["image_url"]} alt="Image" width={100} height={100} />
      </div>
      <div className="clm">
        <h1>{obj["name"]}</h1>

        <div className="badge badge-blue">
          {obj["category"]}
        </div>

        {obj["status"] !== "in_stock" ? (
          <div className="badge badge-red">
            Out of stock
          </div>
        ) : (
          <div className="badge badge-green">
            In stock
          </div>
        )}

        <br />
        <br />

        <div className="product-price">
          <sup>$</sup>{
            ("" + obj["price"]).split('.')[0]
          }
          <sup>{
            ("" + obj["price"]).split('.')[1]
          }
          </sup>
        </div>

        <div className="product-quantity">
          Quantity: {obj["quantity"]}
        </div>

      </div>
      <div className="product-features">
        <h2>Specifications</h2>
        <table>
          <tbody>
            <tr key="brand">
              <td>Brand</td>
              <td>{obj["brand"]}</td>
            </tr>
            {Object.keys(obj["attributes"]).map((key) => (
              <tr key={key}>
                <td>{key.replace('_', ' ')}</td>
                <td>{
                  typeof (obj["attributes"][key]) == "boolean" ? (
                    obj["attributes"][key] ? "Yes" : "No"
                  ) : obj["attributes"][key]
                }</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const SearchButton = () => {
  const [searchModal, setSearchModal] = useState(false);

  let searchText = "";
  const [searchResults, setSearchResults] = useState([]);

  const search = () => {
    let results = [];

    for (let item of Items) {
      if (item.name.toLowerCase().includes(searchText.toLowerCase())) {
        results.push(item);
      }
    }

    setSearchResults(results);
  }

  return (
    <>
      <div className="search-bar" onClick={e => {
        e.preventDefault();

        let modal = e.currentTarget.parentElement.querySelector('.modal');

        if (modal.classList.contains("modal-hide")) {
          modal.classList.remove("modal-hide");
          modal.classList.add("modal-show");

          let mc = modal.querySelector('div.modal-content');
          if (mc.classList.contains("exit-in-style")) {
            mc.classList.remove("exit-in-style");
            mc.classList.add("enter-in-style");
          }
          else {
            mc.classList.add("enter-in-style");
          }
        }
        else {
          modal.classList.remove("modal-show");
          modal.classList.add("modal-hide");
        }
      }}>
        <Image src={SearchSVG} alt="Search" width={20} height={20} />
      </div>
      <div>
        <div className="modal modal-hide">
          <div className="modal-content">
            <div className="modal-header">
              <span className="close" onClick={e => {
                e.preventDefault();
                let modal = e.currentTarget.parentElement.parentElement.parentElement;
                modal.classList.remove("modal-show");
                modal.classList.add("modal-hide");
              }}>&times;</span>
              <h2>Search</h2>
            </div>
            <div className="modal-body">
              <input type="text" placeholder="Search for items" onChange={e => {
                // setSearchText(e.target.value);
                searchText = e.target.value;
                search();
              }} />
            </div>
            <div className="search-results">
              {searchResults.map((item) => (
                <div className="search-item" key={item.id} onClick={() => {
                  lastSelectedItem = selectedItem;
                  selectedItem = item;
                }}>
                  <div className="clm-inline">
                    <Image src={FileSVG} alt="Warehouse" width={20} height={20} />
                  </div>
                  <div className="clm-inline">
                    {item.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");

  if (!username) {
    window.location.href = "/login";
  }

  GLOBAL_CONFIG = configGodowns();
  let renderComps = [];

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  for (let godown of Godowns) {
    if (!godown.parent_godown) {
      renderComps.push(<FolderView godown={GLOBAL_CONFIG[godown.id]} key={godown.id} />);
    }
  }

  useEffect(() => {
    const timeoutID = setInterval(() => {
      if (selectedItem != lastSelectedItem) {
        lastSelectedItem = selectedItem;
        forceUpdate();
      }

    }, 200);

    return () => clearTimeout(timeoutID);
  }, []);

  return (
    <div id="main">
      <div id="preview">
        <div className={"noitem-sel " + (selectedItem !== null ? "disp-hide" : "")}>
          <h2>No item selected</h2>
        </div>

        {selectedItem != null ? (
          <Product obj={selectedItem} />
        ) : null}
      </div>
      <div className="sidebar">
        <h1>Welcome {username}</h1>
        <br />
        {renderComps}
      </div>

      <SearchButton />
    </div>
  );
}
