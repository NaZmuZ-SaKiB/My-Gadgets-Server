import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { SettingsService } from './settings.service';

const get = catchAsync(async (req, res) => {
  const result = await SettingsService.get();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings fetched successfully',
    data: result,
  });
});

const update = catchAsync(async (req, res) => {
  const result = await SettingsService.update(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Settings updated successfully',
    data: result,
  });
});

export const SettingsController = {
  get,
  update,
};
