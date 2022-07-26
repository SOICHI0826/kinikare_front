/* eslint-disable no-unused-vars */
import { Header } from "./../../components/Header/Header" // ヘッダーコンポーネント
import { Footer } from "./../../components/Footer/Footer" // フッターコンポーネント
import { HobbiesGroup } from "./../../components/HobbiesGroup/HobbiesGroup" // 趣味のタグを並べるコンポーネント
import { HobbiesGroupButton } from "./../../components/HobbiesGroupButton/HobbiesGroupButton"
import { HobbiesGroupDeleteButton } from "./../../components/HobbiesGroupDeleteButton/HobbiesGroupDeleteButton"
import { useAuth } from "./../../utils/useAuth" // 認証情報を取得する関数
import { departments } from "../../utils/departments" // 所属部署の一覧
import { offices } from "../../utils/offices" // 勤務地のの一覧
import { birthPlaces } from "../../utils/birthPlaces" // 出身地の一覧（都道府県）
import userApi from "../../services/user" // ユーザー情報をIDを引数としてAPIで取得する //APIでユーザー情報を書き換える
import hobbyApi from "../../services/hobby" // ユーザー情報をIDを引数としてAPIで取得する
import imageApi from "../../services/image" // ユーザープロフィール画像をIDを引数として取得
import { css } from "@emotion/css"
import React, { useEffect, useState } from "react"
import { useForm, Controller } from "react-hook-form"
import {
    Heading, Button, FormControl, Input, Avatar, Box, Circle, Text,
    HStack,
    FormLabel, Divider,
    FormErrorMessage,
    Radio, RadioGroup, Select, Textarea, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody,
    Alert, AlertIcon, AlertDescription
} from "@chakra-ui/react"
import { HiPlus, HiCheck, HiOutlineCamera } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

// プロフィール編集ページの本体
export const EditProfile = () => {
    const navigate = useNavigate()
    const auth = useAuth() // 中身はisLoading,isAuthenticated(True or False),username,signIn,signOut
    const [user, setUser] = useState("")
    // ユーザー自分の趣味のリスト
    const [userHobbies, setUserHobbies] = useState([]) // ユーザーの趣味（APIで取ってくる））
    // ユーザーが選択してない趣味のリスト
    const [otherHobbies, setOtherHobbies] = useState() // ユーザーの趣味ではないもの（allHobbiesからuserHobbiesを引いたもの
    const [submitCondition, setSubmitCondition] = useState("default")
    const [image, setImage] = useState()

    // 初回レンダリング時にserialFetchData()を実行
    useEffect(() => {
        const fetchData = async () => {
            // APIからユーザーデータ取得
            const userResult = await userApi.get(auth.username)
            const userImage = await imageApi.get(auth.username)
            setUser(userResult.data)

            // userResult.data.genderの型修正
            const tempGender = userResult.data.gender
            const stringGender = String(tempGender)
            // フォームに入れる初期値設定(genderだけ別の状態で管理しているのでloopの外で処理を行う)
            for (const key in userResult.data) {
                if (key !== "gender") {
                    setValue(key, userResult.data[key])
                }
            }
            setValue("gender", stringGender)
            setImage(userImage.data)

            // 趣味リストの編集
            setUserHobbies(userResult.data.hobbies_list)
            const hobbyResult = await hobbyApi.get()
            const allHobbies = []
            for (const hobby of hobbyResult.data.Items) {
                allHobbies.push(hobby.hobby)
            }
            // ユーザーの趣味以外の趣味リスト
            const remainingHobbies = allHobbies
            for (const n in userResult.data.hobbies_list) {
                const index = remainingHobbies.indexOf(userResult.data.hobbies_list[n])
                remainingHobbies.splice(index, 1)
            }
            setOtherHobbies(remainingHobbies)
        }
        fetchData()
    }, [])

    const { register, handleSubmit, formState: { errors, isSubmitting }, setValue, control } = useForm()

    // api を呼び出す処理
    const onSubmit = (data) => {
        const submitUser = data
        submitUser.hobbies_list = userHobbies
        submitUser.gender = Number(submitUser.gender)
        try {
            const result = userApi.put(auth.username, submitUser)
            setSubmitCondition("success")
            setTimeout(() => { navigate("/profile") }, 5000)
        } catch (error) {
            setSubmitCondition("failed")
        }
    }

    const tabs = [
        {
            title: "キニカレ",
            link: "/",
            isSelected: false
        },
        {
            title: "マイプロフィール",
            link: "/profile",
            isSelected: true
        }
    ]
    // モダルのためのFlagとMethod
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <div className={styles.container}>
            {/* ヘッダーの定義 */}
            <Header className={styles.header} tabs={tabs} auth={auth}/>
            <div className={styles.main} >
                {/* メインコンテンツが入る枠の定義 */}
                <div className={styles.mainContent}>
                    <Heading size="xl" mb="30px">プロフィール編集</Heading>
                    {(() => {
                        if (submitCondition === "success") {
                            return (<Alert status="success">
                                <AlertIcon />
                                <AlertDescription>更新できました！5秒後マイプロフィール画面に戻ります！</AlertDescription>
                            </Alert>)
                        } else if (submitCondition === "failed") {
                            return (<Alert status="error">
                                <AlertIcon />
                                <AlertDescription>プロフィールを更新できませんでした</AlertDescription>
                            </Alert>)
                        }
                    })()}
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <div className={styles.formMainContainer} >
                            {/* メインコンテンツの左半分の枠 */}
                            <div className={styles.leftContainer} >
                                {/* メインコンテンツの左側・アイコン領域の枠 */}
                                <div className={styles.IconContainer} >
                                    <Avatar mb="30px" size="2xl" name={user.last_name} src={`data:image/png;base64,${image}`}/>
                                    <Button size="sm" colorScheme="teal" onClick={() => []}>
                                        写真変更
                                    </Button>
                                </div>
                                {/* メインコンテンツの左側・趣味タグ編集領域の枠 */}
                                <div className={styles.HobbiesContainer}>
                                    <Heading size="sm" mb="5px">趣味</Heading>
                                    <Button leftIcon={<HiPlus />} size="md" colorScheme="teal" onClick={onOpen}>
                                        趣味タグを追加
                                    </Button>
                                    <Box bg="#F5F5F5" borderRadius="md" w="190px" minH="100px" mt="10px" p="10px">
                                        <HobbiesGroup hobbies={userHobbies}></HobbiesGroup>
                                    </Box>
                                    {/* モダルの定義 */}
                                    <Modal isOpen={isOpen} onClose={onClose} >
                                        <ModalOverlay />
                                        <ModalContent className={styles.modalContent} >
                                            <ModalBody>
                                                <div>
                                                    {/* 選択中の趣味 */}
                                                    <div className={styles.upperContainer}>
                                                        <div className={styles.modalTitle}>
                                                            <Circle mr="20px" size="40px" bg="green.100" color="green.600">
                                                                <HiCheck color="green.600"/>
                                                            </Circle>
                                                            <div>
                                                                <Heading size="18px">選択中の趣味</Heading>
                                                                <Text size="14px" color="gray.500">クリックで削除可能です</Text>
                                                            </div>
                                                        </div>
                                                        <Box bg="white" borderRadius="md" mt="10px" p="10px">
                                                            <HobbiesGroupDeleteButton hobbies={userHobbies} setHobbies={setUserHobbies} otherHobbies={otherHobbies} setOtherHobbies={setOtherHobbies}></HobbiesGroupDeleteButton>
                                                        </Box>
                                                    </div>
                                                    <Divider mt="8px" mb="8px" />
                                                    {/* 趣味のライブラリ */}
                                                    <div className={styles.lowerContainer}>
                                                        <div className={styles.modalTitle}>
                                                            <Circle mr="20px" size="40px" bg="orange.100" color="orange.500">
                                                                <HiOutlineCamera color="orange.500" />
                                                            </Circle>
                                                            <div>
                                                                <Heading size="18px">趣味のライブラリ</Heading>
                                                                <Text size="14px" color="gray.500">当てはまる趣味を選んでください</Text>
                                                            </div>
                                                        </div>
                                                        <Box bg="white" borderRadius="md" mt="10px" p="10px">
                                                            <HobbiesGroupButton hobbies={userHobbies} setHobbies={setUserHobbies} otherHobbies={otherHobbies} setOtherHobbies={setOtherHobbies}></HobbiesGroupButton>
                                                        </Box>
                                                    </div>
                                                </div>
                                            </ModalBody>

                                            <ModalFooter>
                                                <Button colorScheme="blue" mr={3} onClick={onClose}>
                                                    保存
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </div>
                            </div>
                            {/* メインコンテンツの右半分の枠 */}
                            <div className={styles.rightContainer}>
                                {/* 名前入力フォームの定義 */}
                                <div className={styles.nameContainer}>
                                    <FormControl mb="24px" isInvalid={errors.last_name}>
                                        <FormLabel htmlFor="last_name">姓</FormLabel>
                                        <Input bg="white" id="last_name" placeholder="例：山田" size="lg"
                                            {...register("last_name", {
                                                required: "必ず姓を入力してください",
                                                maxLength: {
                                                    value: 30,
                                                    message: "30文字以内でお願いします"
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\u4E00-\u9FFF\u3040-\u309f]*$/i,
                                                    message: "漢字、ひらがな、英字を入力してください"
                                                }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.last_name && errors.last_name.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl mb="24px" isInvalid={errors.first_name}>
                                        <FormLabel htmlFor="first_name">名</FormLabel>
                                        <Input bg="white" id="first_name" placeholder="例：太郎" size="lg"
                                            {...register("first_name", {
                                                required: "必ず名を入力してください",
                                                maxLength: {
                                                    value: 30,
                                                    message: "30文字以内でお願いします"
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z\u4E00-\u9FFF\u3040-\u309f]*$/i,
                                                    message: "漢字、ひらがな、英字を入力してください"
                                                }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.first_name && errors.first_name.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                {/* 名前カナ入力フォームの枠 */}
                                <div className={styles.kanaContainer}>
                                    <FormControl mb="24px" isInvalid={errors.last_name_kana}>
                                        <FormLabel htmlFor="last_name_kana">セイ</FormLabel>
                                        <Input bg="white" id="last_name_kana" placeholder="例：ヤマダ" size="lg"
                                            {...register("last_name_kana", {
                                                required: "必ずセイを入力してください",
                                                maxLength: {
                                                    value: 30,
                                                    message: "30文字以内でお願いします"
                                                },
                                                pattern: {
                                                    value: /^[ァ-ヶー ]*$/,
                                                    message: "全角カタカナを入力してください"
                                                }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.last_name_kana && errors.last_name_kana.message}</FormErrorMessage>
                                    </FormControl>
                                    <FormControl mb="24px" isInvalid={errors.first_name_kana}>
                                        <FormLabel htmlFor="first_name_kana">メイ</FormLabel>
                                        <Input bg="white" id="first_name_kana" placeholder="例：タロウ" size="lg"
                                            {...register("first_name_kana", {
                                                required: "必ずメイを入力してください",
                                                maxLength: {
                                                    value: 30,
                                                    message: "30文字以内でお願いします"
                                                },
                                                pattern: {
                                                    value: /^[ァ-ヶー ]*$/,
                                                    message: "全角カタカナを入力してください"
                                                }
                                            })}
                                        />
                                        <FormErrorMessage>{errors.first_name_kana && errors.first_name_kana.message}</FormErrorMessage>
                                    </FormControl>
                                </div>
                                {/* 性別ラジオボタン領域の定義 */}
                                <FormControl mb="24px" as="fieldset" isInvalid={errors.gender}>
                                    <FormLabel as="legend">性別</FormLabel>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <RadioGroup onChange={onChange} value={value}>
                                                <HStack spacing="24px">
                                                    <Radio value="3">回答しない</Radio>
                                                    <Radio value="1">男性</Radio>
                                                    <Radio value="2">女性</Radio>
                                                </HStack>
                                            </RadioGroup>
                                        )}
                                    />
                                    <FormErrorMessage>{errors.gender && errors.gender.message}</FormErrorMessage>
                                </FormControl>
                                {/* 部署選択プルダウンの定義 */}
                                <FormControl mb="24px" isInvalid={errors.department}>
                                    <FormLabel htmlFor="department">部署</FormLabel>
                                    <Select id="department" placeholder="部署" {...register("department", { required: "必ず部署を入力してください" })}>
                                        {departments.map((department) => (
                                            <option key={department}>{department}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.department && errors.department.message}</FormErrorMessage>
                                </FormControl>
                                {/* オフィス選択プルダウンの定義 */}
                                <FormControl mb="24px" isInvalid={errors.office}>
                                    <FormLabel htmlFor="office">普段通っているオフィス</FormLabel>
                                    <Select id="default_office" placeholder="オフィス" {...register("default_office", { required: "必ずオフィスを入力してください" })}>
                                        {offices.map((office) => (
                                            <option key={office}>{office}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.office && errors.office.message}</FormErrorMessage>
                                </FormControl>
                                {/* 出身地選択プルダウンの定義 */}
                                <FormControl mb="24px" isInvalid={errors.birthPlace}>
                                    <FormLabel htmlFor="birthPlace">出身地</FormLabel>
                                    <Select id="birthplace" placeholder="出身地" {...register("birthplace", { required: "必ず出身地を入力してください" })}>
                                        {birthPlaces.map((birthPlace) => (
                                            <option key={birthPlace}>{birthPlace}</option>
                                        ))}
                                    </Select>
                                    <FormErrorMessage>{errors.birthPlace && errors.birthPlace.message}</FormErrorMessage>
                                </FormControl>
                                {/* みんなに一言領域の定義 */}

                                <FormControl mb="24px" isInvalid={errors.comment}>
                                    <FormLabel htmlFor="free_comments">みんなに一言！</FormLabel>
                                    <Controller
                                        name="comment"
                                        control={control}
                                        rules={{
                                            maxLength: {
                                                value: 150,
                                                message: "150文字以内でお願いします"
                                            }
                                        }}
                                        render={({ field: { onChange, value } }) => (
                                            <Textarea placeholder="Hello" onChange={onChange} value={value}></Textarea>

                                        )}
                                    />
                                    <FormErrorMessage>{errors.comment && errors.comment.message}</FormErrorMessage>
                                </FormControl>
                            </div>
                        </div>
                        <Button size="lg" colorScheme="teal" isLoading={isSubmitting} type="submit">
                            提出
                        </Button>
                    </form>
                </div>
            </div>
            {/* フッターの定義 */}
            <Footer className={styles.footer} />
        </div>
    )
}

// eslint-disable-next-line max-lines-per-function
const styles = {
    container: css({
        display: "grid",
        gridTemplateAreas: `
            "header "
            "main"
            "footer"
        `,
        gridTemplateRows: " 114px 1fr 69px",
        margin: "0 auto",
        minHeight: "100vh"
    }),
    header: css({
        gridArea: "header",
        position: "sticky",
        top: 0,
        zIndex: 100,
        width: "100%"
    }),
    main: css({
        gridArea: "main",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
        margin: "50px auto"
    }),
    mainContent: css({
        maxWidth: "1200px"
    }),
    form: css({
        display: "flex",
        flexDirection: "column"
    }),
    formMainContainer: css({
        display: "flex",
        flexDirection: "row",
        gap: "50px"
    }),
    leftContainer: css({
        width: "35%"
    }),
    IconContainer: css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "50px"
    }),
    HobbiesContainer: css({
        display: "flex",
        flexDirection: "column"
    }),
    rightContainer: css({
        width: "65%"
    }),
    modalTitle: css({
        display: "flex"
    }),
    modalContent: css({
        padding: "26px 0"
    }),
    footer: css({
        gridArea: "footer",
        width: "100%"
    })

}
