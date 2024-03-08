import master from "../assets/master.png";
import credit from "../assets/credit.png";
import visa from "../assets/visa.png";

function footer() {
  return (
    <footer>
      <div className="contact">
        <h3>Contact Us:</h3>
        <p>info@mysite.com</p>
        <p>Tel: 876-543-9876</p>
      </div>
      <div className="address">
        <h3>Address:</h3>
        <p>500 Terry Francine Street</p>
        <p>San Francisco, CA 94358</p>
      </div>
      <div className="Payment">
        <h3>Accepted Payments:</h3>
        <img src={visa} alt="" />
        <img src={master} alt="" />
        <img src={credit} alt="" />
      </div>
    </footer>
  );
}

export default footer;
