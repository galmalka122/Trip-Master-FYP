package com.hac.finalproject.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import javax.validation.Valid;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.hac.finalproject.repos.User.User;

@Controller
@RequestMapping("/")
public class HomePage {

  @GetMapping("")
  public static String main(Model model) {
    return "index";
  }

  @GetMapping("login")
  public static String login(Model model) {
    return "login";
  }

  @GetMapping("signup")
  public static String signup(@Valid User user, Model model) {
    model.addAttribute("user", user);
    return "signup";
  }

  @PostMapping("signup/process_register")
  public static String postSignUp(@Valid User user, BindingResult bindingResult) {
    if (bindingResult.hasErrors()) {
      return "form";
    }
    return "index";

  }

}
