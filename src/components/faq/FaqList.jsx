import React from "react";
import FaqItem from "./FaqItem";
import { faqs } from "../../assets/data/faqs";

const FaqList = () => {
  return (
    <div className="mt-[38px]">
      {faqs.map((item, index) => (
        <FaqItem item={item} />
      ))}
    </div>
  );
};

export default FaqList;
