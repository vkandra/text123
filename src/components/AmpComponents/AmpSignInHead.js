import { Heading, useTheme } from '@aws-amplify/ui-react';

export function SignInHeader() {
  const { tokens } = useTheme();

  return (
    <Heading
      level={4}
      padding={`${tokens.space.xl} ${tokens.space.xl} 0`}
      color="#384988"
    >
      Sign in to your Account
    </Heading>
  );
}
