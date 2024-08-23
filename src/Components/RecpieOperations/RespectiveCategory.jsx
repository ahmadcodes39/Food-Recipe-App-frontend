import React, { useEffect, useState, useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import { respectiveCategoryData } from '../ApiRoutes/apiRoutes'
import { QueryContext } from '../UseContext/searchQuery'

const RespectiveCategory = () => {
  const { query } = useContext(QueryContext);
  const { item } = useParams();
  const [recipesInfo, setRecipesInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await respectiveCategoryData(setRecipesInfo, item);
    };
    fetchData();
  }, [item]);

  const searchItems = recipesInfo.filter(
    (food) =>
      food.name.toLowerCase().includes(query.toLowerCase()) ||
      food.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='mt-5'>
      {recipesInfo.length > 0 && (
        <h2 className='text-center text-secondary mt-5 p-5 mb-3'>
          {recipesInfo[0].category}
        </h2>
      )}
      <div className="items">
        <div className="row justify-content-center justify-lg-content-left gap-2">
          {searchItems.map((item, itemIndex) => (
            <div
              key={itemIndex}
              className="card col-12 col-sm-6 col-md-3 mb-2 border-0 p-0 rounded"
              style={{ width: "17rem" }}
            >
              <Link to={`/recipe/${item._id}`}>
                <img
                  src={`http://localhost:3000/${item.coverImg}`}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "50vh", objectFit: "cover" }}
                />
              </Link>
              <div className="card-body">
                <p className="card-text text-center fw-bold fs-6">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RespectiveCategory
