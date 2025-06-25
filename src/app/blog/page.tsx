import BlogPageSesction from "@/components/blog/BlogPageSesction";
import CommonBanner from "@/components/common/CommonBanner";
import React from "react";

const BlogPage = () => {
  return (
    <div>
      <CommonBanner title='Blog' path='/blog' />
      <BlogPageSesction />
    </div>
  );
};

export default BlogPage;
