import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Colors, Sizes, parseSizeWidth } from '~theme';

const data = [
    require('~assets/images/pool/bannerHome.png'),
];

const Index = () => {
    const renderItem = ({ item }) => (
        <View style={styles.wrapImage}>
            <Image resizeMode="stretch" source={item} style={styles.imageProduct} />
        </View>
    );

    return (
        <View style={styles.carouselContainer}>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderWidth={parseSizeWidth(375)}
                itemWidth={parseSizeWidth(350)}
                loop
                autoplay
                autoplayInterval={3000}
                inactiveSlideScale={0.9}
                inactiveSlideOpacity={0.7}
            />
        </View>
    );
};

export default Index;

const styles = StyleSheet.create({
    carouselContainer: {
        height: parseSizeWidth(218),
    },
    wrapImage: {
        height: parseSizeWidth(218),
        borderRadius: parseSizeWidth(8),
        overflow: 'hidden',
    },
    imageProduct: {
        height: '100%',
        width: '98%',
        borderRadius: parseSizeWidth(8),
        overflow: 'hidden',
    },
});
