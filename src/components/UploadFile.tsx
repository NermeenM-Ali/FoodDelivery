import React, { Component } from 'react'
import { TouchableOpacity, View, Text, StatusBar, StyleSheet, I18nManager, Platform } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Modal from "react-native-modal";
import { scale, verticalScale, moderateScale } from '../utils/Scaling'
import colors from '../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface UploadFileProps {
    uploadStyle: any;
    multiple: boolean;
    FolderName: string;
    uploading: Function;
    onSuccess: Function;
    uploadFile: Function
    isDocument?: boolean
    isVideo?: boolean
    getVideo: Function
    startUpload?: boolean
    isImage?: boolean
}

interface UploadFileStates {
    isEditModalVisible: boolean
}

export class UploadFile extends Component<UploadFileProps, UploadFileStates>{
    // fileUploadServiceApi = new FileUploadApiService();
    constructor(props: UploadFileProps) {
        super(props)
        this.state = {
            isEditModalVisible: false,
        }
    }

    uploadImage(fileObj: any, isFileContact = false) {
        const { multiple, FolderName } = this.props;
        const fromData = new FormData();
        this.props.uploading(true, false);
        if (isFileContact) {
            fromData.append('files', { uri: `${fileObj.path}`, name: fileObj.name, type: fileObj.mime });
        } else {
            if (multiple) {
                fileObj.forEach((img: any, index: number) => {
                    const name = img.path.split('/')[img.path.split('/').length - 1];
                    fromData.append(`files[${index}]`, { uri: img.path, name, type: img.mime });
                });
            } else {
                const name = fileObj.path.split('/')[fileObj.path.split('/').length - 1];
                fromData.append('files', { uri: fileObj.path, name, type: fileObj.mime });
            }
        }

        // this.fileUploadServiceApi.Upload(FolderName, fromData).then(({ Data, Success }) => {
        //     if (Success) {
        //         // this.props.getVideo(Data)
        //         // console.log({ Data }, 'file');
        //         this.props.uploading(false, false);
        //         this.props.onSuccess(Data);
        //     } else {
        //         this.props.uploading(false, false);
        //         RNToasty.Error({ title: I18nManager.isRTL?"حدث خطأ أثناء الرفع":'Error while uploading' });
        //     }
        // }).catch(error => {
        //     this.props.uploading(false, false);
        //     RNToasty.Error({ title: I18nManager.isRTL?"حدث خطأ أثناء الرفع":'Error while uploading' })
        // })
    }

    toggleModal() {
        this.setState({
            isEditModalVisible: !this.state.isEditModalVisible
        })
    }

    openGallery() {
        const { multiple } = this.props;
        ImagePicker.openPicker({
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            cropping: Platform.OS === 'ios' ? false : !multiple,
            multiple,
        }).then((image: any) => {
            this.uploadImage(image)
            this.props.onSuccess(image) // hyt4al lma aft7 el uploadapi
            this.setState({ isEditModalVisible: false })
        });
    }

    openCamera() {
        const { multiple } = this.props;
        ImagePicker.openCamera({
            compressImageMaxHeight: 1024,
            compressImageMaxWidth: 1024,
            cropping: Platform.OS === 'ios' ? false : !multiple,
            multiple
        }).then((image: any) => {
            this.uploadImage(image)
            this.props.onSuccess(image)// hyt4al lma aft7 el uploadapi
            this.setState({ isEditModalVisible: false })
        });
    }

    renderModal() {
        const { isDocument, isVideo, startUpload, isImage } = this.props
        return (
            <Modal isVisible={this.state.isEditModalVisible}>
                <View style={styles.modalContainer}>

                    <View>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity activeOpacity={0.9}
                                style={styles.modalTextContainer}
                                onPress={() => {
                                    this.openGallery()
                                    StatusBar.setHidden(false, 'slide')
                                }} >
                                <MaterialIcons
                                    name='photo-library'
                                    style={styles.icon} />
                                <Text style={styles.modalText}>{I18nManager.isRTL ? 'أختر من الجاليري' : 'Open Gallery'}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: verticalScale(0.1), backgroundColor: 'lightgray' }} />
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.modalTextContainer}
                                activeOpacity={0.9}
                                onPress={() => this.openCamera()}>
                                <MaterialIcons
                                    name='camera-alt'
                                    style={styles.icon} />
                                <Text style={styles.modalText}>{I18nManager.isRTL ? 'ألتقط من الكاميرا' : 'Open Camera'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: verticalScale(7), backgroundColor: 'transparent' }} />
                    <TouchableOpacity activeOpacity={0.9}
                        onPress={() => this.toggleModal()}
                        style={styles.cancelTextContainer}>
                        <Text style={styles.modalText}>{I18nManager.isRTL ? 'إلغاء' : 'Cancel'}</Text>
                    </TouchableOpacity>
                </View>
            </Modal >
        )
    }

    render() {
        return (
            <TouchableOpacity activeOpacity={1} onPress={() => this.toggleModal()} style={[this.props.uploadStyle]}>
                {this.props.children}
                {this.renderModal()}
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: scale(342),
        height: verticalScale(65),
        borderRadius: moderateScale(10),
        elevation: 7,
        flexDirection: 'row-reverse',
        alignSelf: 'center',
        marginTop: verticalScale(30),
    },
    modalContainer: {
        position: 'absolute',
        bottom: verticalScale(-38),
        height: verticalScale(180),
        backgroundColor: 'transparent',
        width: scale(350),
        alignSelf: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        height: verticalScale(55),
        width: scale(350),
        marginVertical: verticalScale(0.3)
    },
    modalTextContainer: {
        flexDirection: 'row',
        // backgroundColor:'red',
        height: verticalScale(20),
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: scale(7),
        flex: 1
    },
    cancelTextContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        height: verticalScale(50),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: scale(25),
        marginTop: verticalScale(-4)
    },
    modalText: {
        fontSize: moderateScale(14),
        fontFamily: 'Poppins-Regular',
        color: 'black'
    },
    icon: {
        marginHorizontal: scale(7),
        color: colors.MAIN_COLOR,
        fontSize: moderateScale(22)
    }
})