import {
    FixedSizeList as List,
    areEqual,
    ListChildComponentProps,
} from "react-window";
import RouteLink from "./RouteLink";
import React, { memo } from "react";
import { DetailItemWrapper } from "./Hierarchy";
import { Box } from "@material-ui/core";

// @ts-ignore
import { ReactWindowScroller } from 'react-window-scroller'
import { makeStyles } from "@material-ui/core/styles";
import memoize from "memoize-one";
import {VocabularyTermsListProps} from "./VocabularyTermsList";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        borderColor: "#e0e0e0 !important",
        "&:hover": {
            backgroundColor: "#e0e0e0",
        },
    },
}));

const Row = memo(({ data, index, style }: ListChildComponentProps) => {
    const classes = useStyles();
    const { items } = data;

    const item = items[index];

    return (
        <div style={style}>
            <Box borderBottom={2} className={classes.wrapper}>
                <RouteLink
                    to={item.route}
                    variant="h6"
                    style={{
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    {item.label.cs}
                </RouteLink>
            </Box>
        </div>
    );
}, areEqual);

const createItemData = memoize((items) => ({
    items,
}));


const VocabularyTermsListWindow: React.FC<VocabularyTermsListProps> = (props) => {
    const itemData = createItemData(props.terms);
    return (
        <DetailItemWrapper title={"Pojmy"}>

        <ReactWindowScroller>
            {({ ref, outerRef, style, onScroll }:any) => (
                <List
                    ref={ref}
                    width={10}
                    outerRef={outerRef}
                    style={style}
                    height={window.innerHeight}
                    itemCount={props.terms.length}
                    itemSize={34}
                    overscanCount={30}
                    itemData={itemData}
                    onScroll={onScroll}
                >
                    {Row}
                </List>
            )}
        </ReactWindowScroller>

        </DetailItemWrapper>
    );
};
export default VocabularyTermsListWindow;
