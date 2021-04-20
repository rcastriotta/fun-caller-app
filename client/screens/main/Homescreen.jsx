import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import Top from '../../components/Homescreen/Top';
import SlideUp from '../../components/Homescreen/SlideUp';
import CategoryBar from '../../components/Homescreen/CategoryBar';
import PranksList from '../../components/Homescreen/PranksList';
import { useInfiniteQuery } from 'react-query';

const Homescreen = ({ navigation }) => {
    const [category, setCategory] = useState('all')
    const [searchField, setSearchField] = useState('')

    const fetchPranks = async ({ pageParam = 0 }) => {
        const res = await fetch(`https://api.prankdial.com/v1/pranks?order=popular&tag=${category}&page=${pageParam}&limit=12&q=${searchField}&language=en-US`)
        const result = await res.json();
        return result;
    }

    const {
        status,
        data,
        isFetching,
        isFetchingNextPage,
        error,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery(['pranks', category, searchField], fetchPranks, {
        getNextPageParam: (lastPage, pages) => {
            const canLoadMore = lastPage.meta.pagination.links.next ? true : false;
            const currentPage = lastPage.meta.pagination.current_page;
            return canLoadMore ? currentPage + 1 : undefined;
        }
    })

    const getMore = () => {
        if (hasNextPage) {
            fetchNextPage()
        }
    }

    return (
        <View style={styles.screen}>
            <Top
                setSearchField={setSearchField}
                navigate={() => navigation.navigate('Tokens')}
            />
            <SlideUp getMore={getMore}>
                <CategoryBar
                    category={category}
                    setCategory={setCategory} />
                <PranksList
                    error={error}
                    nav={navigation}
                    isLoading={isFetching || isFetchingNextPage}
                    data={data}
                />
            </SlideUp>
        </View >
    )
}


const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primary
    }
})

export default Homescreen;
