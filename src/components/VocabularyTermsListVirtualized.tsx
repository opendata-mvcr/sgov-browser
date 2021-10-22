import React, {memo} from "react";
import {VocabularyTermsListProps} from "./VocabularyTermsList";
import {areEqual, FixedSizeList, ListChildComponentProps} from "react-window";

// @ts-ignore
import { WindowScroller } from "react-virtualized";
import {DetailItemWrapper} from "./Hierarchy";
import {makeStyles} from "@material-ui/core/styles";
import {Box} from "@material-ui/core";
import RouteLink from "./RouteLink";
import memoize from "memoize-one";


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

    const item = items[index%items.length];

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


const VocabularyTermsListVirtualized: React.FC<VocabularyTermsListProps>=(props)=>{
    const itemData = createItemData(props.terms);

    const list = React.useRef<any>(null);
    const onScroll = React.useCallback(({ scrollTop }) => {
        list.current?.scrollTo(scrollTop);
    }, []);
    return (
        <>
            <DetailItemWrapper title={"Pojmy"}>
            <WindowScroller onScroll={onScroll}>
                {() => <div />}
            </WindowScroller>

            <div>

                <FixedSizeList
                    ref={list}
                    itemSize={35}
                    width={"50%"}
                    itemCount={1000}
                    itemData={itemData}
                    overscanCount={30}

                    height={window.innerHeight - 80}
                    style={{ height: '100% !important' }}
                >
                    {Row}
                </FixedSizeList>
            </div>
            </DetailItemWrapper>
        </>
    );
}
export default VocabularyTermsListVirtualized