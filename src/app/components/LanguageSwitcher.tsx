'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { setUserLocale } from '../../i18n/locale';
import { localeNames, locales, type Locale } from '../../i18n/config';

/**
 * Locale switcher for the landing nav. Persists the choice via the
 * `setUserLocale` server action (NEXT_LOCALE cookie) then refreshes so the
 * server re-renders with the new messages and text direction.
 */
export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === locale) return;
    startTransition(async () => {
      await setUserLocale(next);
      router.refresh();
    });
  }

  return (
    <Menu placement="bottom-end">
      <MenuButton
        as={Button}
        size="sm"
        colorScheme="green"
        variant="outline"
        borderRadius="md"
        isLoading={isPending}
      >
        {locale.toUpperCase()}
      </MenuButton>
      <MenuList minW="10rem" zIndex={2000}>
        {locales.map((l) => (
          <MenuItem
            key={l}
            onClick={() => change(l)}
            fontWeight={l === locale ? 'bold' : 'normal'}
          >
            {localeNames[l]}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}
