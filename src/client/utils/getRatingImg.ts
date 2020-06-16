import Rating0 from '@client/images/regular_0.png';
import Rating1 from '@client/images/regular_1.png';
import Rating15 from '@client/images/regular_1_half.png';
import Rating2 from '@client/images/regular_2.png';
import Rating25 from '@client/images/regular_2_half.png';
import Rating3 from '@client/images/regular_3.png';
import Rating35 from '@client/images/regular_3_half.png';
import Rating4 from '@client/images/regular_4.png';
import Rating45 from '@client/images/regular_4_half.png';
import Rating5 from '@client/images/regular_5.png';

const ratingImg = {
    r0: Rating0,
    r1: Rating1,
    'r1.5': Rating15,
    r2: Rating2,
    'r2.5': Rating25,
    r3: Rating3,
    'r3.5': Rating35,
    r4: Rating4,
    'r4.5': Rating45,
    r5: Rating5,
};

const getRatingImg = (rating: number) => {
    const ratingImgKey = `r${rating}`;
    return ratingImg[ratingImgKey];
};

export default getRatingImg;
