import { Flex, Image, useTheme } from '@aws-amplify/ui-react';
import logoImage from '../../Pictures/aLPHA.png';

export function Header() {
  const { tokens } = useTheme();

  return (
    <Flex justifyContent="center">
      <Image
        src={logoImage}
        alt="text-extractor"
        padding={tokens.space.medium}
      />
    </Flex>
  );
}

{
  /* <img
          className="logoImg"
          src="https://amazon-textract-s3bucket.s3.ap-south-1.amazonaws.com/input/Black___White_Minimalist_Business_Logo__3_-removebg-preview.png"
          alt="text-extractor"
          width="17%"
        /> */
}
