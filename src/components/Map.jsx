import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [seachParams, setSearchParams] = useSearchParams();

  const lat = seachParams.get("lat");
  const lng = seachParams.get("lng");

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <h1>
        Position: {lat}, {lng}
      </h1>
      <button onClick={() => setSearchParams({ lat: 30, lng: 100 })}>
        Click me
      </button>
    </div>
  );
}

export default Map;
