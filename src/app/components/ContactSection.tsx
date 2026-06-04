"use client";

import {
  Box, Container, VStack, Heading, Text, Card, CardBody, Stack, SimpleGrid,
  FormControl, FormLabel, Input, Textarea, Button, useToast, useColorModeValue,
  Link, HStack, Icon
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import emailjs from "@emailjs/browser";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";

export default function ContactSection() {
  const toast = useToast();
  const t = useTranslations("contact");
  const cardBg = useColorModeValue("white", "gray.900");
  const infoBlockBg = useColorModeValue("green.50", "gray.800");
  const infoBlockHoverBg = useColorModeValue("green.100", "gray.700");
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    try {
      const serviceId = "service_e0j42vj";
      const templateId = "template_5r9jmuj";
      const publicKey = "TrQFyZbU7gtk2iEzq";

      // Sends all <input name="..."> values to your EmailJS template
      await emailjs.sendForm(serviceId, templateId, formRef.current, { publicKey });

      formRef.current.reset();
      toast({ title: t("sentSuccess"), status: "success", duration: 4000 });
    } catch {
      toast({ title: t("sendFailTitle"), description: t("sendFailDesc"), status: "error", duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const borderColor = useColorModeValue("gray.600", "gray.900");

  return (
    <Container maxW="4xl">
      <VStack spacing={10} position="relative" paddingTop={10} width="full">
        <Box w="80px" h="2px" bgGradient="linear(to-r, transparent, green.500, transparent)" mx="auto" position="absolute" top={0} left="50%" transform="translateX(-50%)" />
        <Box textAlign="center">
          <Text fontSize="xs" fontWeight="semibold" letterSpacing="wider" color="green.600" textTransform="uppercase" mb={1}>
            {t("eyebrow")}
          </Text>
          <Heading size="xl" color="green.600" mb={2}>{t("title")}</Heading>
          <Box w="48px" h="1" bg="green.500" borderRadius="full" mx="auto" />
        </Box>

        <Text textAlign="center" fontSize="lg" maxW="2xl">
          {t("intro")}
        </Text>

        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="100%">
          <Card bg={cardBg} borderRadius="2xl" boxShadow="card" borderWidth="1px" borderColor={borderColor} w="100%" _hover={{ boxShadow: "card-hover" }} transition="all 0.2s">
            <CardBody p={6}>
              <form ref={formRef} onSubmit={onSubmit}>
                <Stack spacing={4}>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <FormControl isRequired>
                      <FormLabel color="green.600" fontSize="sm">{t("lastName")}</FormLabel>
                      <Input name="last_name" placeholder={t("lastName")} borderRadius="xl" borderColor={borderColor} focusBorderColor="green.500" />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel color="green.600" fontSize="sm">{t("firstName")}</FormLabel>
                      <Input name="first_name" placeholder={t("firstName")} borderRadius="xl" borderColor={borderColor} focusBorderColor="green.500" />
                    </FormControl>
                  </SimpleGrid>

                  <FormControl isRequired>
                    <FormLabel color="green.600" fontSize="sm">{t("email")}</FormLabel>
                    <Input name="reply_to" type="email" placeholder={t("email")} borderRadius="xl" borderColor={borderColor} focusBorderColor="green.500" />
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel color="green.600" fontSize="sm">{t("message")}</FormLabel>
                    <Textarea name="message" placeholder={t("messagePlaceholder")} rows={4} borderRadius="xl" borderColor={borderColor} focusBorderColor="green.500" />
                  </FormControl>

                  <Input name="website" display="none" tabIndex={-1} autoComplete="off" />

                  <Button type="submit" colorScheme="green" size="lg" w="100%" borderRadius="xl" isLoading={loading} _hover={{ transform: "scale(1.01)" }} transition="transform 0.2s">
                    {t("send")}
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>

          <Card bg={cardBg} borderRadius="2xl" boxShadow="card" borderWidth="1px" borderColor={borderColor} w="100%" _hover={{ boxShadow: "card-hover" }} transition="all 0.2s">
            <CardBody display="flex" flexDirection="column" justifyContent="center" gap={6} py={8} px={6}>
              <Heading size="md" color="green.600" mb={2}>{t("getInTouch")}</Heading>
              <VStack align="stretch" spacing={4}>
                <HStack align="flex-start" spacing={4} p={4} borderRadius="xl" bg={infoBlockBg} _hover={{ bg: infoBlockHoverBg }} transition="background 0.2s">
                  <Box flexShrink={0} w={10} h={10} borderRadius="xl" bg="green.500" color="white" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={HiOutlineMail} boxSize={5} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" color="green.600" textTransform="uppercase" letterSpacing="wider" mb={1}>{t("email")}</Text>
                    <Link href="mailto:contact@agrogo.ma" color="green.700" fontWeight="medium" _dark={{ color: "green.300" }} _hover={{ textDecoration: "underline" }}>contact@agrogo.ma</Link>
                  </Box>
                </HStack>
                <HStack align="flex-start" spacing={4} p={4} borderRadius="xl" bg={infoBlockBg} _hover={{ bg: infoBlockHoverBg }} transition="background 0.2s">
                  <Box flexShrink={0} w={10} h={10} borderRadius="xl" bg="green.500" color="white" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={HiOutlinePhone} boxSize={5} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" color="green.600" textTransform="uppercase" letterSpacing="wider" mb={1}>{t("phone")}</Text>
                    <Link href="tel:+2120684433054" color="green.700" fontWeight="medium" _dark={{ color: "green.300" }} _hover={{ textDecoration: "underline" }}>+(212) 06 84 43 30 54</Link>
                  </Box>
                </HStack>
                <HStack align="flex-start" spacing={4} p={4} borderRadius="xl" bg={infoBlockBg} _hover={{ bg: infoBlockHoverBg }} transition="background 0.2s">
                  <Box flexShrink={0} w={10} h={10} borderRadius="xl" bg="green.500" color="white" display="flex" alignItems="center" justifyContent="center">
                    <Icon as={HiOutlineLocationMarker} boxSize={5} />
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="semibold" color="green.600" textTransform="uppercase" letterSpacing="wider" mb={1}>{t("visitUs")}</Text>
                    <Text color="green.700" fontWeight="medium" _dark={{ color: "green.300" }}>{t("location")}</Text>
                  </Box>
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
