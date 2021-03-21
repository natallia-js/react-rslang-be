const { OK, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const router = require('express').Router();

const userService = require('./user.service');
const { id, user } = require('../../utils/validation/schemas');
const {
  validator,
  userIdValidator
} = require('../../utils/validation/validator');

const multer = require('multer');
const fs = require('fs');
const uuid = require('uuid');
const path = require('path');
const {
  UPLOAD_DIR,
  UPLOADED_FILE_MAX_SIZE_IN_BYTES
} = require('../../common/config');

/**
 * Определяем каталог хранения загружаемых файлов и правило формирования их имен в данном каталоге.
 */
const storage = multer.diskStorage({
  destination(_req_, _file_, cb) {
    cb(null, UPLOAD_DIR);
  },
  filename(_req_, file, cb) {
    const fileName = uuid.v4() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

/**
 * Типы принимаемых файлов.
 */
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    return cb(null, true);
  }
  const errMess = 'Only png|jpg|jpeg image files are allowed!';
  req.fileValidationError = errMess;
  return cb(new Error(errMess), false);
};

// Для загрузки фото пользователей
const upload = multer({
  storage,
  fileFilter: imageFilter,
  limits: { fileSize: UPLOADED_FILE_MAX_SIZE_IN_BYTES }
});

router.post(
  '/',
  upload.single('filedata'),
  validator(user, 'body'),
  async (req, res) => {
    if (req.fileValidationError) {
      return res
        .status(BAD_REQUEST)
        .send({ message: req.fileValidationError }.toResponse());
    }
    const photoData = req.file
      ? {
          // eslint-disable-next-line no-sync
          data: fs.readFileSync(path.join(UPLOAD_DIR, req.file.filename)),
          contentType: req.file.mimetype
        }
      : null;
    const userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: photoData
    };
    if (req.file) {
      fs.unlink(req.file.path, err => {
        if (err) {
          // HANLDE ERROR
        }
      });
    }
    const userEntity = await userService.save(userData);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.get(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    const userEntity = await userService.get(req.params.id);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.get('/:id/photo', validator(id, 'params'), async (req, res) => {
  const userPhoto = await userService.getPhoto(req.params.id);
  res.header('Content-Type', userPhoto.contentType);
  res.status(OK).send(userPhoto.data);
});

router.put(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  validator(user, 'body'),
  async (req, res) => {
    const userEntity = await userService.update(req.userId, req.body);
    res.status(OK).send(userEntity.toResponse());
  }
);

router.delete(
  '/:id',
  userIdValidator,
  validator(id, 'params'),
  async (req, res) => {
    await userService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  }
);

module.exports = router;
