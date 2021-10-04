import React from "react"
import ContentLoader from "react-content-loader"

const SearchResultLoader = () => (
    <ContentLoader
        speed={2}
        width={476}
        height={124}
        viewBox="0 0 476 124"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <rect x="5" y="6" rx="3" ry="3" width="410" height="30" />
        <rect x="5" y="41" rx="3" ry="3" width="380" height="6" />
        <rect x="6" y="69" rx="3" ry="3" width="178" height="6" />
        <rect x="5" y="54" rx="3" ry="3" width="380" height="6" />
    </ContentLoader>
)

export default SearchResultLoader;