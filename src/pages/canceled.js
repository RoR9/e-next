import Link from "next/link";
import { BsEmojiFrownFill } from "react-icons/bs";

const Cancelled = () => {
  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="fail-icon">
          <BsEmojiFrownFill />
        </p>
        <h2>Oops,something went wrong!</h2>
        <p className="email-msg">
          It seems like the payment has been cancelled.
        </p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:oder@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" width="300px" type="button">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cancelled;
