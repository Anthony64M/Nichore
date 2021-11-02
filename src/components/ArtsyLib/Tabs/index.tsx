import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { useRouter } from 'next/router'

import Link from "next/link";
import { TabsContainer } from "./styles";
import { TabsProps } from "./type";

export const TabPages: React.FC<TabsProps> = ({
  alternativeTabText,
  tabText,
  tabFirstLink,
  tabSecondLink,
}) => {
  const { pathname } = useRouter()
  const { colors } = useContext(ThemeContext)

  const firstLink = pathname === '/account/[email]' || pathname === '/account/[email]/followers' ? colors.font : null
  const secondLink = pathname === '/account/[email]/albuns' || pathname === '/account/[email]/following' ? colors.font : null

  return (
    <TabsContainer>
      <div className="firstContainer">
        <Link
          href={tabFirstLink}
        >
          <a style={{ color: firstLink }}>{alternativeTabText}</a>
        </Link>

        {tabSecondLink && (
          <>
            <div className="separator" />

            <Link
              href={tabSecondLink}
            >
              <a style={{ color: secondLink }}>{tabText}</a>
            </Link>
          </>
        )}
      </div>
    </TabsContainer>
  );
};
