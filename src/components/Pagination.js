import React, { useState, useEffect } from "react";
import Table from "./PaginationTable";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(10);

  useEffect(() => {
    apiData();
  }, []);

  async function apiData() {
    try{
    let response = await fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    );
    let responseData = await response.json();
    setData(responseData);
  }catch(err){
    alert("failed to fetch data")
    console.log(err)
  }
  }

  //get current posts
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = data.slice(indexOfFirstPost, indexOfLastPost);

  const handleClickPrevious = () => {
    if(currentPage === 1){
      alert("You are at page 1, please click next for another page")
    }else{
      let change = currentPage - 1
      setCurrentPage(change);
    }
  }
  // Calculate total pages
  const totalPages = Math.ceil(data.length / postPerPage);

  const handlClickNext = () => {
    if(currentPage === totalPages){
      alert("Please click on previous button")
    }else{
      let change = currentPage + 1;
      setCurrentPage(change)
    }
  }

  return (
    <div>
      <Table data={currentPost}/>

      <button onClick={handleClickPrevious}>Previous</button>
      <span>{currentPage}</span>
      <button onClick={handlClickNext}>Next</button>

    </div>
  );
};

export default Pagination;
